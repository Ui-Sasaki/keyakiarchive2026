import "server-only";

import { Client } from "@elastic/elasticsearch";

// Elasticsearchクライアントの設定
const client = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:19200",
  // 開発環境では認証を無効化
  auth: process.env.ELASTICSEARCH_USERNAME
    ? {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD || "",
      }
    : undefined,
});

// インデックス名
export const PRESENTATION_INDEX = "presentations";

// Elasticsearchクライアントのエクスポート
export default client;

// 接続テスト用の関数
export const testConnection = async () => {
  try {
    const health = await client.cluster.health();
    console.log("Elasticsearch connection successful:", health);
    return true;
  } catch (error) {
    console.error("Elasticsearch connection failed:", error);
    return false;
  }
};
