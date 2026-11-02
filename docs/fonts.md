# Self-hosted web fonts

The site ships three small, Turkish/Latin-subset WOFF2 files in `src/assets/fonts/` instead of
the `@fontsource` packages (≈46 KB total, one request per face). The subset covers ASCII, Turkish letters, the Latin-1 characters the copy uses (plus é and the Turkish circumflex vowels), typographic quotes/dashes, arrows and ₺/€; any other character falls back to the metric-matched local font via `unicode-range`:

| File                                     | Source                                   | Instance                                       |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| `manrope-var-tr.woff2`                   | Manrope variable TTF (Google Fonts repo) | variable, `wght` 400–700                       |
| `cormorant-garamond-600-tr.woff2`        | Cormorant Garamond variable TTF          | static `wght=600` (the only roman weight used) |
| `cormorant-garamond-italic-500-tr.woff2` | Cormorant Garamond Italic variable TTF   | static `wght=500`                              |

Vertical metrics are unchanged from the upstream fonts, so the metric-matched fallback
`@font-face` rules in `src/styles.css` (`size-adjust`, `ascent-override`, …) stay valid.

## Rebuild

```bash
pip install --user fonttools brotli
U="U+0020-007E,U+00A0,U+00A9,U+00AB,U+00B0,U+00B7,U+00BB,U+00C2,U+00C7,U+00C9,U+00CE,U+00D6,U+00DB,U+00DC,U+00E2,U+00E7,U+00E9,U+00EE,U+00F6,U+00FB,U+00FC,U+011E-011F,U+0130-0131,U+015E-015F,U+2013-2014,U+2018-201E,U+2022,U+2026,U+2039-203A,U+20AC,U+20BA,U+2122,U+2190-2193,U+2197,U+2264-2265"
F="kern,liga,calt,ccmp,locl,mark,mkmk,lnum,pnum,tnum"
OPTS="--unicodes=$U --layout-features=$F --no-hinting --desubroutinize --flavor=woff2"

# Manrope: keep the variable axis, limited to 400–700
python3 -m fontTools.varLib.instancer Manrope[wght].ttf wght=400:700 -o m.ttf
python3 -m fontTools.subset m.ttf $OPTS --output-file=src/assets/fonts/manrope-var-tr.woff2

# Cormorant Garamond: static 600
python3 -m fontTools.varLib.instancer "CormorantGaramond[wght].ttf" wght=600 -o c.ttf
python3 -m fontTools.subset c.ttf $OPTS --output-file=src/assets/fonts/cormorant-garamond-600-tr.woff2

# Cormorant Garamond Italic: static 500
python3 -m fontTools.varLib.instancer "CormorantGaramond-Italic[wght].ttf" wght=500 -o ci.ttf
python3 -m fontTools.subset ci.ttf $OPTS --output-file=src/assets/fonts/cormorant-garamond-italic-500-tr.woff2
```

Keep the `unicode-range` in `src/styles.css` identical to `$U`. If you add a weight (e.g. a
700 heading), re-instance Cormorant with that weight (or as a 500:700 variable range).

# Generated article index

`src/content/article-index.gen.ts` holds the article titles/descriptions/word counts so list pages
and SEO metadata do not pull every article body into the JS bundle (bodies load per route).
After editing any article in `src/content/tr` or `src/content/en`, run:

```bash
node scripts/gen-article-index.mjs && npx prettier --write src/content/article-index.gen.ts
```

`src/test/content.test.ts` fails if the index is out of date.
