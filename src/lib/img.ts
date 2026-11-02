/**
 * Responsive image helper.
 * Smaller WebP copies of the large photos live in src/assets/_v/ (generated with sharp:
 * `<dir>__<name>.w<width>.webp`). `rs(src, sizes)` returns `srcSet`/`sizes` props for an
 * imported asset URL so the browser downloads only the size it needs.
 */
const ORIGINALS = import.meta.glob(
  [
    "/src/assets/hero-*.webp",
    "/src/assets/img-*.webp",
    "/src/assets/covers/*.webp",
    "/src/assets/gallery/*.webp",
  ],
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;
const VARIANTS = import.meta.glob("/src/assets/_v/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const byUrl = new Map<string, string>();

function build() {
  if (byUrl.size) return;
  const groups = new Map<string, [string, number][]>();
  for (const [k, url] of Object.entries(VARIANTS)) {
    const m = /\/_v\/(.+)\.w(\d+)\.webp$/.exec(k);
    if (!m) continue;
    const key = m[1]!;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push([url, Number(m[2])]);
  }
  for (const [k, url] of Object.entries(ORIGINALS)) {
    const key = k
      .replace("/src/assets/", "")
      .replace(/\//g, "__")
      .replace(/\.webp$/, "");
    const v = groups.get(key);
    if (!v) continue;
    const w = nativeWidth(key);
    const list = [...v.sort((a, b) => a[1] - b[1]), [url, w] as [string, number]];
    byUrl.set(url, list.map(([u, x]) => `${u} ${x}w`).join(", "));
  }
}

function nativeWidth(key: string) {
  if (key.startsWith("covers__")) return 1024;
  if (key.startsWith("gallery__"))
    return key.includes("balloons-sunrise-wide") ? 1280 : key.includes("blue-hour") ? 864 : 1152;
  return 1600; // hero-*, img-*
}

export function rs(src: string, sizes: string): { srcSet?: string; sizes?: string } {
  build();
  const srcSet = byUrl.get(src);
  return srcSet ? { srcSet, sizes } : {};
}
