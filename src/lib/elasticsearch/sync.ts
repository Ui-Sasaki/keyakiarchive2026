// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import client, { PRESENTATION_INDEX } from "@/lib/elasticsearch";
import prisma from "@/lib/prisma";

// Presentationデータ型
export interface PresentationDocument {
  id: string;
  title: string;
  detail: string | null;
  firstDayLocation: number;
  secondDayLocation: number;
  firstDay: number;
  secondDay: number;
  genre: number[];
  userId: string;
}

// 単一のプレゼンテーションをElasticsearchにインデックス
export const indexPresentation = async (presentation: PresentationDocument) => {
  try {
    const response = await client.index({
      index: PRESENTATION_INDEX,
      id: presentation.id,
      document: {
        ...presentation,
        // タイムスタンプは現在時刻を使用
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    console.log(`Presentation ${presentation.id} indexed successfully`);
    return response;
  } catch (error) {
    console.error(`Failed to index presentation ${presentation.id}:`, error);
    throw error;
  }
};

// プレゼンテーションをElasticsearchから削除
export const deletePresentation = async (presentationId: string) => {
  try {
    const response = await client.delete({
      index: PRESENTATION_INDEX,
      id: presentationId,
    });

    console.log(`Presentation ${presentationId} deleted successfully`);
    return response;
  } catch (error) {
    console.error(`Failed to delete presentation ${presentationId}:`, error);
    throw error;
  }
};

// PostgreSQLからElasticsearchへの全データ同期
export const syncAllPresentations = async () => {
  try {
    console.log("Starting full sync from PostgreSQL to Elasticsearch...");

    // PostgreSQLからすべてのプレゼンテーションを取得
    const presentations = await prisma.presentation.findMany({
      select: {
        id: true,
        title: true,
        detail: true,
        firstDayLocation: true,
        secondDayLocation: true,
        firstDay: true,
        secondDay: true,
        genre: true,
        userId: true,
      },
    });

    console.log(`Found ${presentations.length} presentations to sync`);

    // バルクインデックス用のデータを準備
    const bulkBody = presentations.flatMap((presentation) => [
      {
        index: {
          _index: PRESENTATION_INDEX,
          _id: presentation.id,
        },
      },
      {
        ...presentation,
        // タイムスタンプは現在時刻を使用
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    if (bulkBody.length === 0) {
      console.log("No presentations to sync");
      return { success: true, count: 0 };
    }

    // バルクインデックス実行
    const response = await client.bulk({
      body: bulkBody,
    });

    if (response.errors) {
      console.error("Some documents failed to index:", response.items);
      const failedCount =
        response.items?.filter(
          (item) =>
            item.index?.error ||
            item.create?.error ||
            item.update?.error ||
            item.delete?.error,
        ).length || 0;
      console.log(
        `Sync completed with errors. ${presentations.length - failedCount}/${presentations.length} documents indexed successfully`,
      );
    } else {
      console.log(
        `All ${presentations.length} presentations synced successfully`,
      );
    }

    return {
      success: !response.errors,
      count: presentations.length,
      errors: response.errors ? response.items : null,
    };
  } catch (error) {
    console.error("Failed to sync presentations:", error);
    throw error;
  }
};

// インデックスの統計情報を取得
export const getPresentationIndexStats = async () => {
  try {
    const stats = await client.indices.stats({
      index: PRESENTATION_INDEX,
    });

    const count = await client.count({
      index: PRESENTATION_INDEX,
    });

    return {
      documentCount: count.count,
      indexSize:
        stats.indices?.[PRESENTATION_INDEX]?.total?.store?.size_in_bytes || 0,
      indexExists: true,
    };
  } catch (error) {
    console.error("Failed to get index stats:", error);
    return {
      documentCount: 0,
      indexSize: 0,
      indexExists: false,
    };
  }
};

// PostgreSQLに存在しないElasticsearch上のドキュメントを削除
export const cleanupDeletedPresentations = async () => {
  try {
    console.log("🧹 Checking for deleted presentations in Elasticsearch...");

    // Elasticsearchから全ドキュメントのIDを取得
    const elasticDocs = await client.search({
      index: PRESENTATION_INDEX,
      body: {
        query: { match_all: {} },
        _source: false, // IDのみ取得
        size: 10000, // 最大10000件まで対応
      },
    });

    if (!elasticDocs.hits?.hits?.length) {
      console.log("No documents found in Elasticsearch");
      return { deletedCount: 0 };
    }

    // ElasticsearchのドキュメントID一覧
    const elasticIds = elasticDocs.hits.hits.map((hit) => hit._id);
    console.log(`Found ${elasticIds.length} documents in Elasticsearch`);

    // PostgreSQLから存在するプレゼンテーションIDを取得
    const existingPresentations = await prisma.presentation.findMany({
      select: { id: true },
    });
    const postgresIds = existingPresentations.map((p) => p.id);
    console.log(`Found ${postgresIds.length} presentations in PostgreSQL`);

    // PostgreSQLに存在しないElasticsearchドキュメントを特定
    const orphanedIds = elasticIds.filter((id) => !postgresIds.includes(id));

    if (orphanedIds.length === 0) {
      console.log("✅ No orphaned documents found");
      return { deletedCount: 0 };
    }

    console.log(
      `🗑️ Found ${orphanedIds.length} orphaned documents:`,
      orphanedIds,
    );

    // 孤立したドキュメントを削除
    const deletePromises = orphanedIds.map(async (id) => {
      try {
        await client.delete({
          index: PRESENTATION_INDEX,
          id: id,
        });
        console.log(`Deleted orphaned document: ${id}`);
        return { id, success: true };
      } catch (error) {
        console.error(`Failed to delete document ${id}:`, error);
        return { id, success: false, error };
      }
    });

    const deleteResults = await Promise.all(deletePromises);
    const successCount = deleteResults.filter(
      (result) => result.success,
    ).length;

    console.log(
      `✅ Cleanup completed: ${successCount}/${orphanedIds.length} orphaned documents deleted`,
    );

    return {
      deletedCount: successCount,
      orphanedIds,
      results: deleteResults,
    };
  } catch (error) {
    console.error("❌ Failed to cleanup deleted presentations:", error);
    throw error;
  }
};

// 完全同期（削除検知含む）
export const fullSyncWithCleanup = async () => {
  try {
    console.log("🔄 Starting full sync with cleanup...");

    // 1. 通常の同期（追加・更新）
    const syncResult = await syncAllPresentations();

    // 2. 削除されたドキュメントのクリーンアップ
    const cleanupResult = await cleanupDeletedPresentations();

    console.log("✅ Full sync with cleanup completed");

    return {
      synced: syncResult.count,
      deleted: cleanupResult.deletedCount,
      total: syncResult.count - cleanupResult.deletedCount,
    };
  } catch (error) {
    console.error("❌ Full sync with cleanup failed:", error);
    throw error;
  }
};
