import type { ArticleBody } from "./types";
import { TR_1 } from "./tr/part1";
import { TR_2 } from "./tr/part2";
import { TR_3 } from "./tr/part3";
import { TR_4 } from "./tr/part4";

/** Turkish article bodies keyed by article id. Inline links use [text](/path/), bold uses **text**. */
export const TR: Record<string, ArticleBody> = { ...TR_1, ...TR_2, ...TR_3, ...TR_4 };
