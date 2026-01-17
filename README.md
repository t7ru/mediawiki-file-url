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

// From a plain filename (default base URL is set to Wikimedia Commons uploads root)
const url1 = mwFileUrl("Tesla_circa_1890.jpeg");

// Set a module-wide default base URL once (used when you omit baseUrl)
mwSetBaseUrl("https://wiki.archlinux.org/images");
const url2 = mwFileUrl("Tango-edit-clear.svg");
const url3 = mwWikiFileUrl("File:Tango-edit-clear.svg");

// Or create bound converters for one base URL (recommended if you need multiple wikis)
const lol = mwWithBaseUrl("https://wiki.leagueoflegends.com/en-us/images");
const url4 = lol.mwFileUrl("Champions_Mesh_concept_03.jpg");
const url5 = lol.mwWikiFileUrl("  Image:   Champions_Mesh_concept_02.jpg   ");
```

## API
### `mwFileUrl(filename, [baseUrl])`

- `filename` (string) - e.g. `"My Image.png"`
- `baseUrl` (string, optional) — if omitted, uses the configured default base URL (which is the Tower Defense Simulator Wiki)

Returns the hashed upload URL.

### `mwWikiFileUrl(wikiSyntax, [baseUrl])`
- `wikiSyntax` (string) - must start with `File:` or `Image:` (whitespace is trimmed)
- `baseUrl` (string, optional) — if omitted, uses the configured default base URL

Extracts the filename and calls `mwFileUrl`.

### `mwSetBaseUrl(baseUrl)`
Sets the module-wide default base URL used by `mwFileUrl` / `mwWikiFileUrl` when `baseUrl` is omitted.

### `mwWithBaseUrl(baseUrl)`
Returns `{ mwFileUrl, mwWikiFileUrl }` functions bound to a specific `baseUrl`, so you don’t have to pass it each call.

## Notes
- ESM only.
- If a wiki uses a custom hashed layout, it won't work.
