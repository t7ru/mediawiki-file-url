import {
  mwFileUrl,
  mwWikiFileUrl,
  mwSetBaseUrl,
  getDefaultBaseUrl,
  mwWithBaseUrl,
} from "./index.js";

let hasFailures = false;

function check(testName, actual, expected) {
  if (actual === expected) {
    console.log(`[Pass] ${testName}`);
    console.log(` - Output: ${actual}\n`);
  } else {
    console.error(`[Fail] ${testName}`);
    console.error(` - Expected: ${expected}`);
    console.error(` - Actual:   ${actual}\n`);
    hasFailures = true;
  }
}

console.log("=== Wiki File Converter Tests ===\n");

// 1
try {
  const url1 = mwFileUrl("Tesla_circa_1890.jpeg");
  check(
    'Test 1: Basic filename conversion (MediaWiki Commons) - Input: "Tesla_circa_1890.jpeg"',
    url1,
    "https://upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg",
  );
} catch (error) {
  console.error("[Fail] Test 1 Error:", error.message, "\n");
  hasFailures = true;
}

// 2
try {
  const url2 = mwFileUrl(
    "Mamoru Shigemitsu signs the Instrument of Surrender, officially ending the Second World War.jpg",
  );
  check(
    'Test 2: Filename with spaces (normalized to underscores) - Input: "Mamoru Shigemitsu signs the Instrument of Surrender, officially ending the Second World War.jpg"',
    url2,
    "https://upload.wikimedia.org/wikipedia/commons/9/94/Mamoru_Shigemitsu_signs_the_Instrument_of_Surrender,_officially_ending_the_Second_World_War.jpg",
  );
} catch (error) {
  console.error("[Fail] Test 2 Error:", error.message, "\n");
  hasFailures = true;
}

// 3
try {
  const baseUrl = "https://wiki.archlinux.org/images";
  const url3 = mwFileUrl("Tango-edit-clear.svg", baseUrl);
  check(
    'Test 3: Custom MediaWiki Base URL - Input: "Tango-edit-clear.svg", Base: "https://wiki.archlinux.org/images"',
    url3,
    "https://wiki.archlinux.org/images/5/53/Tango-edit-clear.svg",
  );
} catch (error) {
  console.error("[Fail] Test 3 Error:", error.message, "\n");
  hasFailures = true;
}

// 4
try {
  const url4 = mwWikiFileUrl("File:Tesla_circa_1890.jpeg");
  check(
    'Test 4: Wiki syntax conversion ("File:") - Input: "File:Tesla_circa_1890.jpeg"',
    url4,
    "https://upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg",
  );
} catch (error) {
  console.error("[Fail] Test 4 Error:", error.message, "\n");
  hasFailures = true;
}

// 5
try {
  const url5 = mwWikiFileUrl("Image:Tesla_circa_1890.jpeg");
  check(
    'Test 5: Wiki syntax conversion ("Image:") - Input: "Image:Tesla_circa_1890.jpeg"',
    url5,
    "https://upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg",
  );
} catch (error) {
  console.error("[Fail] Test 5 Error:", error.message, "\n");
  hasFailures = true;
}

// 6
try {
  const url6 = mwWikiFileUrl(
    "File:Mamoru Shigemitsu signs the Instrument of Surrender, officially ending the Second World War.jpg",
  );
  check(
    'Test 6: Wiki syntax with spaces - Input: "File:Mamoru Shigemitsu signs the Instrument of Surrender, officially ending the Second World War.jpg"',
    url6,
    "https://upload.wikimedia.org/wikipedia/commons/9/94/Mamoru_Shigemitsu_signs_the_Instrument_of_Surrender,_officially_ending_the_Second_World_War.jpg",
  );
} catch (error) {
  console.error("[Fail] Test 6 Error:", error.message, "\n");
  hasFailures = true;
}

// 7
try {
  const url7 = mwWikiFileUrl(
    "  Image:   Wolfgang Amadé Mozart as a Boy.jpg   ",
  );
  check(
    'Test 7: Wiki syntax trimming - Input: "  Image:   Wolfgang Amadé Mozart as a Boy.jpg   "',
    url7,
    "https://upload.wikimedia.org/wikipedia/commons/f/f8/Wolfgang_Amadé_Mozart_as_a_Boy.jpg",
  );
} catch (error) {
  console.error("[Fail] Test 7 Error:", error.message, "\n");
  hasFailures = true;
}

// 8
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

  const url8 = mwFileUrl("Tango-edit-clear.svg");
  check(
    "Test 8: mwSetBaseUrl + getDefaultBaseUrl - Default baseUrl changed via mwSetBaseUrl()",
    url8,
    "https://wiki.archlinux.org/images/5/53/Tango-edit-clear.svg",
  );

  mwSetBaseUrl(previous);
} catch (error) {
  console.error("[Fail] Test 8 Error:", error.message, "\n");
  hasFailures = true;
}

// 9
try {
  const baseUrl = "https://static.wikia.nocookie.net/tower-defense-sim/images";
  const { mwFileUrl: tdswFileUrl, mwWikiFileUrl: tdswWikiFileUrl } =
    mwWithBaseUrl(baseUrl);

  const url9a = tdswFileUrl("WarlockLevel1.png");
  const url9b = tdswWikiFileUrl("File:WarlockLevel2.png");

  console.log("Test 9: mwWithBaseUrl(baseUrl)");
  check(
    " - Output (filename)",
    url9a,
    "https://static.wikia.nocookie.net/tower-defense-sim/images/a/a1/WarlockLevel1.png",
  );
  check(
    " - Output (wiki)",
    url9b,
    "https://static.wikia.nocookie.net/tower-defense-sim/images/a/ad/WarlockLevel2.png",
  );
} catch (error) {
  console.error("[Fail] Test 9 Error:", error.message, "\n");
  hasFailures = true;
}

// 10
try {
  console.log("Test 10: Error handling - empty string");
  mwFileUrl("");
  console.error("[Fail] Should have thrown an error\n");
  hasFailures = true;
} catch (error) {
  if (error.message === "Filename must be a non-empty string") {
    console.log(
      "[Pass] Correctly caught error: Filename must be a non-empty string\n",
    );
  } else {
    console.error(`[Fail] Unexpected error message: "${error.message}"\n`);
    hasFailures = true;
  }
}

// 11
try {
  console.log("Test 11: Error handling - invalid wiki syntax");
  mwWikiFileUrl("Category:WarlockLevel1.png");
  console.error("[Fail] Should have thrown an error\n");
  hasFailures = true;
} catch (error) {
  if (error.message === 'Wiki syntax must start with "File:" or "Image:"') {
    console.log(
      '[Pass] Correctly caught error: Wiki syntax must start with "File:" or "Image:"\n',
    );
  } else {
    console.error(`[Fail] Unexpected error message: "${error.message}"\n`);
    hasFailures = true;
  }
}

if (hasFailures) {
  console.error("=== Some tests failed ===");
  process.exit(1);
}

console.log("=== All tests completed ===");
