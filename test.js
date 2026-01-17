import {
  mwFileUrl,
  mwWikiFileUrl,
  mwSetBaseUrl,
  getDefaultBaseUrl,
  mwWithBaseUrl,
} from "./index.js";

let hasFailures = false;

console.log("=== Wiki File Converter Tests ===\n");

// 1
console.log("Test 1: Basic filename conversion (TDS Wiki)");
try {
  const url1 = mwFileUrl("WarlockLevel1.png");
  console.log('[Pass] Input: "WarlockLevel1.png"');
  console.log(` - Output: ${url1}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 2
console.log("Test 2: Filename with spaces (normalized to underscores)");
try {
  const url2 = mwFileUrl("Remake Fungi Island View.png");
  console.log('[Pass] Input: "Remake Fungi Island View.png"');
  console.log(` - Output: ${url2}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 3
console.log("Test 3: Custom MediaWiki Base URL");
try {
  const baseUrl = "https://wiki.archlinux.org/images";
  const url3 = mwFileUrl("Tango-edit-clear.svg", baseUrl);
  console.log(
    '[Pass] Input: "Tango-edit-clear.svg", Base: "https://wiki.archlinux.org/images"',
  );
  console.log(` - Output: ${url3}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 4
console.log('Test 4: Wiki syntax conversion ("File:")');
try {
  const url4 = mwWikiFileUrl("File:WarlockLevel1.png");
  console.log('[Pass] Input: "File:WarlockLevel1.png"');
  console.log(` - Output: ${url4}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 5
console.log('Test 5: Wiki syntax conversion ("Image:")');
try {
  const url5 = mwWikiFileUrl("Image:WarlockLevel1.png");
  console.log('[Pass] Input: "Image:WarlockLevel1.png"');
  console.log(` - Output: ${url5}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 6
console.log("Test 6: Wiki syntax with spaces");
try {
  const url6 = mwWikiFileUrl("File:Remake Fungi Island View.png");
  console.log('[Pass] Input: "File:Remake Fungi Island View.png"');
  console.log(` - Output: ${url6}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 7
console.log("Test 7: Wiki syntax trimming");
try {
  const url7 = mwWikiFileUrl("  Image:   Some Tower Name.png   ");
  console.log('[Pass] Input: "  Image:   Some Tower Name.png   "');
  console.log(` - Output: ${url7}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 8
console.log("Test 8: mwSetBaseUrl + getDefaultBaseUrl");
try {
  const previous = getDefaultBaseUrl();
  const newDefault = "https://wiki.archlinux.org/images";

  mwSetBaseUrl(newDefault);

  const current = getDefaultBaseUrl();
  if (current !== newDefault) {
    throw new Error(
      `Expected default baseUrl to be "${newDefault}", got "${current}"`,
    );
  }

  // When baseUrl is omitted, mwFileUrl should use the configured default
  const url8 = mwFileUrl("Tango-edit-clear.svg");
  console.log("[Pass] Default baseUrl changed via mwSetBaseUrl()");
  console.log(` - Output: ${url8}\n`);

  // restore
  mwSetBaseUrl(previous);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 9
console.log("Test 9: mwWithBaseUrl(baseUrl)");
try {
  const baseUrl = "https://wiki.archlinux.org/images";
  const { mwFileUrl: archFileUrl, mwWikiFileUrl: archWikiFileUrl } =
    mwWithBaseUrl(baseUrl);

  const url9a = archFileUrl("Tango-edit-clear.svg");
  const url9b = archWikiFileUrl("File:Tango-edit-clear.svg");

  console.log("[Pass] Created bound converters using mwWithBaseUrl()");
  console.log(` - Output (filename): ${url9a}`);
  console.log(` - Output (wiki):     ${url9b}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 10
console.log("Test 10: Error handling - empty string");
try {
  mwFileUrl("");
  console.error("[Fail] Should have thrown an error\n");
  hasFailures = true;
} catch (error) {
  console.log("[Pass] Correctly caught error:", error.message, "\n");
}

// 11
console.log("Test 11: Error handling - invalid wiki syntax");
try {
  mwWikiFileUrl("Category:WarlockLevel1.png");
  console.error("[Fail] Should have thrown an error\n");
  hasFailures = true;
} catch (error) {
  console.log("[Pass] Correctly caught error:", error.message, "\n");
}

if (hasFailures) process.exit(1);

console.log("=== All tests completed ===");
