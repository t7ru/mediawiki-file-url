/**
 * Set the module-wide default base URL used by mwFileUrl/mwWikiFileUrl
 * when no baseUrl argument is provided.
 *
 * @param baseUrl The new default base URL string (must be non-empty)
 */
export function mwSetBaseUrl(baseUrl: string): void;

/**
 * Get the current module-wide default base URL.
 * @returns The current default base URL string
 */
export function getDefaultBaseUrl(): string;

/**
 * Converts a wiki filename to a MediaWiki file URL.
 * Should work for any MediaWiki instance that uses
 * any unmodified $wgHashedUploadDirectory implementation.
 *
 * @param filename The filename (for example, "WarlockLevel1.png")
 * @param baseUrl The base URL for images (defaults to configured defaultBaseUrl)
 * @returns The full MediaWiki URL
 * @throws {Error} If filename is invalid or hashing fails
 */
export function mwFileUrl(filename: string, baseUrl?: string): string;

/**
 * Create converters bound to a baseUrl so one does not have to pass it each time.
 *
 * @param baseUrl The base URL to bind to
 * @returns An object containing bound versions of mwFileUrl and mwWikiFileUrl
 */
export function mwWithBaseUrl(baseUrl: string): {
    mwFileUrl: (filename: string) => string;
    mwWikiFileUrl: (wikiSyntax: string) => string;
};

/**
 * Converts a File:/Image: syntax to a MediaWiki URL
 * @param wikiSyntax The wiki syntax (for example, "File:WarlockLevel1.png")
 * @param baseUrl The base URL for images
 * @returns The full MediaWiki URL
 * @throws {Error} If syntax is invalid or conversion fails
 */
export function mwWikiFileUrl(wikiSyntax: string, baseUrl?: string): string;

declare const _default: {
    mwFileUrl: typeof mwFileUrl;
    mwWikiFileUrl: typeof mwWikiFileUrl;
    mwSetBaseUrl: typeof mwSetBaseUrl;
    getDefaultBaseUrl: typeof getDefaultBaseUrl;
    mwWithBaseUrl: typeof mwWithBaseUrl;
};

export default _default;
