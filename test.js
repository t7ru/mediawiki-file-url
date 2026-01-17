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
console.log("Test 1: Basic filename conversion (MediaWiki Commons)");
try {
  const url1 = mwFileUrl("Tesla_circa_1890.jpeg");
  console.log('[Pass] Input: "Tesla_circa_1890.jpeg"');
  console.log(` - Output: ${url1}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 2
console.log("Test 2: Filename with spaces (normalized to underscores)");
try {
  const url2 = mwFileUrl(
    "Mamoru Shigemitsu signs the Instrument of Surrender, officially ending the Second World War.jpg",
  );
  console.log(
    '[Pass] Input: "Mamoru Shigemitsu signs the Instrument of Surrender, officially ending the Second World War.jpg"',
  );
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
  const url4 = mwWikiFileUrl("File:Tesla_circa_1890.jpeg");
  console.log('[Pass] Input: "File:Tesla_circa_1890.jpeg"');
  console.log(` - Output: ${url4}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 5
console.log('Test 5: Wiki syntax conversion ("Image:")');
try {
  const url5 = mwWikiFileUrl("Image:Tesla_circa_1890.jpeg");
  console.log('[Pass] Input: "Image:Tesla_circa_1890.jpeg"');
  console.log(` - Output: ${url5}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 6
console.log("Test 6: Wiki syntax with spaces");
try {
  const url6 = mwWikiFileUrl(
    "File:Mamoru Shigemitsu signs the Instrument of Surrender, officially ending the Second World War.jpg",
  );
  console.log(
    '[Pass] Input: "File:Mamoru Shigemitsu signs the Instrument of Surrender, officially ending the Second World War.jpg"',
  );
  console.log(` - Output: ${url6}\n`);
} catch (error) {
  console.error("[Fail] Error:", error.message, "\n");
  hasFailures = true;
}

// 7
console.log("Test 7: Wiki syntax trimming");
try {
  const url7 = mwWikiFileUrl(
    "  Image:   Wolfgang Amadé Mozart as a Boy.jpg   ",
  );
  console.log(
    '[Pass] Input: "  Image:   Wolfgang Amadé Mozart as a Boy.jpg   "',
  );
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
  const baseUrl = "https://static.wikia.nocookie.net/tower-defense-sim/images";
  const { mwFileUrl: tdswFileUrl, mwWikiFileUrl: tdswWikiFileUrl } =
    mwWithBaseUrl(baseUrl);

  const url9a = tdswFileUrl("WarlockLevel1.png");
  const url9b = tdswWikiFileUrl("File:WarlockLevel2.png");

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
