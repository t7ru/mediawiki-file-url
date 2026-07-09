# mediawiki-file-url

Convert MediaWiki filenames into its hashed upload URLs on wikis with `$wgHashedUploadDirectory` enabled.

## Install

```
npm i mediawiki-file-url
```

## Usage

```js
import {
  mwFileUrl,
  mwWikiFileUrl,
  mwSetBaseUrl,
  mwWithBaseUrl,
} from "mediawiki-file-url";

// Default base URL is set to Wikimedia Commons uploads root
const url1 = mwFileUrl("Tesla_circa_1890.jpeg");

// From a wiki that isn't default
const url2 = mwFileUrl("Place.png", https://static.wikia.nocookie.net/tower-defense-sim/images/);

// Set a module-wide default base URL once
mwSetBaseUrl("https://wiki.archlinux.org/images");
const url3 = mwFileUrl("Tango-edit-clear.svg");
const url4 = mwWikiFileUrl("File:Tango-edit-clear.svg");

// Or create bound converters for one base URL (recommended if you need multiple wikis)
const lol = mwWithBaseUrl("https://wiki.leagueoflegends.com/en-us/images");
const url5 = lol.mwFileUrl("Champions_Mesh_concept_03.jpg");
const url6 = lol.mwWikiFileUrl("  Image:   Champions_Mesh_concept_02.jpg   ");
```

## API

### `mwFileUrl(filename, [baseUrl], [capitalLinks])`

- `filename` (string) - e.g. `"My Image.png"`
- `baseUrl` (string, optional) — if omitted, uses the configured default base URL
- `capitalLinks` (boolean, optional, default `true`) — matches MediaWiki `$wgCapitalLinks` (ucfirst). Pass `false` to opt-out

Returns the hashed upload URL.

### `mwWikiFileUrl(wikiSyntax, [baseUrl], [capitalLinks])`

- `wikiSyntax` (string) - must start with `File:` or `Image:` (whitespace is trimmed)
- `baseUrl` (string, optional) — if omitted, uses the configured default base URL
- `capitalLinks` (boolean, optional, default `true`) — same as `mwFileUrl`

Extracts the filename and calls `mwFileUrl`.

### `mwSetBaseUrl(baseUrl)`

Sets the module-wide default base URL used by `mwFileUrl` / `mwWikiFileUrl` when `baseUrl` is omitted.

### `mwWithBaseUrl(baseUrl, [capitalLinks])`

Returns `{ mwFileUrl, mwWikiFileUrl }` functions bound to a specific `baseUrl` (and optional `capitalLinks`), so you don’t have to pass them each call.

## Notes

- ESM only.
- Spaces are normalized to underscores; with `capitalLinks` true (default), the first character is uppercased (MediaWiki `$wgCapitalLinks`).
- If a wiki uses a custom hashed layout, it won't work.
- If you want an actually authoritative source, use [Imageinfo](https://www.mediawiki.org/wiki/Special:MyLanguage/API:Imageinfo) instead.
