/** Paragraphs render before the list, unless `list` is written before `p` in the object (then they close the section). */
export type Section = {
  id: string;
  h: string;
  p: string[];
  list?: string[];
  sub?: { h: string; p: string[] }[];
};

export type ArticleBody = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  intro: string[];
  sections: Section[];
  takeaways: string[];
};
