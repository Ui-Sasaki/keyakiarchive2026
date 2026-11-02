/**
 * テキスト内の検索キーワードをハイライトするユーティリティ関数
 */
import DOMPurify from "isomorphic-dompurify";

/**
 * HTMLエスケープ処理
 */
function escapeHtml(text: string): string {
  const htmlEscapes: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return text.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
}

/**
 * HTMLタグを除去してプレーンテキストを取得
 */
function _stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/**
 * 検索キーワードをハイライト表示するためのHTMLを生成
 * @param text - 対象テキスト
 * @param keywords - 検索キーワード（スペース区切り）
 * @param className - ハイライト用のCSSクラス名
 * @returns ハイライト済みのHTML文字列
 */
export function highlightText(
  text: string | null,
  keywords: string,
  className: string = "bg-yellow-200 font-semibold",
): string {
  if (!text || !keywords.trim()) {
    return escapeHtml(text || "");
  }

  // テキストをHTMLエスケープ
  const escapedText = escapeHtml(text);

  // キーワードを分割（スペース、全角スペース、カンマで区切り）
  const keywordList = keywords
    .split(/[\s,\u3000]+/)
    .filter((k) => k.trim().length > 0)
    .map((k) => k.trim());

  if (keywordList.length === 0) {
    return escapedText;
  }

  let highlightedText = escapedText;

  // 各キーワードでハイライト処理
  keywordList.forEach((keyword) => {
    // キーワードもHTMLエスケープ
    const escapedKeyword = escapeHtml(keyword);
    // 特殊文字をエスケープ（正規表現用）
    const regexEscapedKeyword = escapedKeyword.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    // 大文字小文字を区別しない正規表現でマッチ
    const regex = new RegExp(`(${regexEscapedKeyword})`, "gi");

    highlightedText = highlightedText.replace(
      regex,
      `<mark class="${className}">$1</mark>`,
    );
  });

  // DOMPurifyでサニタイズして返す
  return DOMPurify.sanitize(highlightedText, {
    ALLOWED_TAGS: ["mark"],
    ALLOWED_ATTR: ["class"],
  });
}

/**
 * Elasticsearchのハイライト結果をReact用に処理
 * @param highlights - Elasticsearchのハイライト結果
 * @param fallbackText - ハイライトがない場合のフォールバックテキスト
 * @param searchKeyword - 検索キーワード（より正確なハイライト用）
 * @returns ハイライト済みのHTML文字列
 */
export function processElasticHighlight(
  highlights: string[] | undefined,
  fallbackText: string | null,
  searchKeyword?: string,
  className: string = "bg-yellow-200 font-semibold",
): string {
  if (highlights && highlights.length > 0) {
    const highlight = highlights[0];

    // Elasticsearchのハイライト結果から<em>タグ内のテキストをすべて抽出
    const highlightedTextMatches = highlight.match(/<em>(.*?)<\/em>/g);
    const highlightedTexts = highlightedTextMatches
      ? highlightedTextMatches.map((match) => match.replace(/<\/?em>/g, ""))
      : [];
    const allHighlightedText = highlightedTexts.join("");

    // 検索キーワードがある場合、ハイライトされた部分が完全一致するかチェック
    if (searchKeyword && searchKeyword.trim()) {
      // 検索キーワードから引用符を除去（完全一致検索対応）
      const cleanedKeyword = searchKeyword
        .replace(/^["']|["']$/g, "")
        .toLowerCase();
      const normalizedAllHighlight = allHighlightedText.toLowerCase();

      // ハイライトされた部分の組み合わせが検索キーワードと完全一致するかチェック
      if (cleanedKeyword === normalizedAllHighlight) {
        // 完全一致の場合はElasticsearchの結果を使用
      } else {
        // 完全一致でない場合はフォールバックを使用（より正確なハイライト）
        return highlightText(fallbackText, cleanedKeyword, className);
      }
    }

    // Elasticsearchのハイライト結果を使用
    // <em>と</em>を一時的なプレースホルダーに置換
    const withPlaceholders = highlight
      .replace(/<em>/g, "__HIGHLIGHT_START__")
      .replace(/<\/em>/g, "__HIGHLIGHT_END__");

    // HTMLエスケープ
    const escaped = escapeHtml(withPlaceholders);

    // プレースホルダーを安全なmarkタグに置換
    const highlightedResult = escaped
      .replace(/__HIGHLIGHT_START__/g, `<mark class="${className}">`)
      .replace(/__HIGHLIGHT_END__/g, "</mark>");

    // DOMPurifyでサニタイズして返す
    return DOMPurify.sanitize(highlightedResult, {
      ALLOWED_TAGS: ["mark"],
      ALLOWED_ATTR: ["class"],
    });
  }

  // Elasticsearchのハイライト結果がない場合は、検索キーワードでハイライト
  if (searchKeyword && searchKeyword.trim()) {
    // 検索キーワードから引用符を除去
    const cleanedKeyword = searchKeyword.replace(/^["']|["']$/g, "");
    return highlightText(fallbackText, cleanedKeyword, className);
  }

  return escapeHtml(fallbackText || "");
}

/**
 * テキストを安全にサニタイズする（ハイライトなし）
 * @param text - サニタイズするテキスト
 * @returns サニタイズされたテキスト
 */
export function sanitizeText(text: string | null): string {
  if (!text) return "";

  // HTMLエスケープしてからDOMPurifyでサニタイズ
  const escaped = escapeHtml(text);
  return DOMPurify.sanitize(escaped, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * 複数のハイライト結果を結合
 * @param highlights - ハイライト結果の配列
 * @param separator - 区切り文字
 * @param maxLength - 最大文字数（切り詰め用）
 * @returns 結合されたハイライト文字列
 */
export function joinHighlights(
  highlights: string[],
  separator: string = " ... ",
  maxLength?: number,
): string {
  const joined = highlights.join(separator);

  const processedJoined =
    maxLength && joined.length > maxLength
      ? joined.substring(0, maxLength) + "..."
      : joined;

  // DOMPurifyでサニタイズして返す
  return DOMPurify.sanitize(processedJoined, {
    ALLOWED_TAGS: ["mark"],
    ALLOWED_ATTR: ["class"],
  });
}
