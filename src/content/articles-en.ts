import type { ArticleBody } from "./types";
import { EN_1 } from "./en/part1";
import { EN_2 } from "./en/part2";
import { EN_3 } from "./en/part3";
import { EN_4 } from "./en/part4";

/** English article bodies keyed by article id. Inline links use [text](/path/), bold uses **text**. */
export const EN: Record<string, ArticleBody> = { ...EN_1, ...EN_2, ...EN_3, ...EN_4 };
