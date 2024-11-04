import { State } from "./config";
import { err } from "./utils";
let dict: { [id: string]: { [id: string]: string } } = {
  // English
  en: { Bookmark: "Bookmark", Bookmarks: "Bookmarks" },
  // Català – Catalan
  ca: { Bookmark: "Marcador" },
  // Deutsch – German
  de: { Bookmark: "Lesezeichen" },
  // Español – Spanish
  es: { Bookmark: "Marcador" },
  // Suomi – Finnish
  fi: { Bookmark: "Kirjanmerkki" },
  // Français – French
  fr: { Bookmark: "Marque-page" },
  // Gaeilge – Irish
  ga: { Bookmark: "Leabharmharc" },
  // हिंदी – Hindi
  hi: { Bookmark: "बुकमार्क" },
  // Bahasa Indonesia – Indonesian
  id: { Bookmark: "Penanda buku" },
  // Italiano – Italian
  it: { Bookmark: "Segnalibro" },
  // 日本語 – Japanese
  ja: { Bookmark: "ブックマーク", Bookmarks: "ブックマーク" },
  // 한국어 – Korean
  ko: { Bookmark: "서표" },
  // Português (BR) – Portuguese (BR)
  "pt-BR": { Bookmark: "Marcador" },
  // Русский – Russian
  ru: { Bookmark: "Закладка" },
  // Türkçe – Turkish
  tr: { Bookmark: "Yer imi" },
  // Українська – Ukrainian
  uk: { Bookmark: "Закладка" },
  // 简体中文 – Simplified Chinese
  "zh-CN": { Bookmark: "书签" },
  // 繁體中文 – Traditional Chinese
  "zh-TW": { Bookmark: "書籤" },
  // 粵文 – Cantonese
  "zh-HK": { Bookmark: "書籤" },
};

export function locale(text: string): string {
  let locale = dict[State.locale];
  if (!locale) {
    err("Invalid locale");
    return text;
  }

  let translation = locale[text];
  if (!translation) {
    err(`No translation in ${State.locale} for ${text}`);
    return text;
  }
  return translation;
}
