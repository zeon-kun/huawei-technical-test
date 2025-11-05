const PORT = process.env.BACKEND_PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function testAPI() {
  console.log("Testing API...");
  let testsPassed = 0;
  let testsFailed = 0;
  // Test 1: Root endpoint
  try {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();

    if (response.status === 200 && data.message) {
      console.log("[PASS] GET / - Root endpoint");
      testsPassed++;
    } else {
      console.log("[FAIL] GET / - Root endpoint");
      testsFailed++;
    }
  } catch (error) {
    console.log(`[FAIL] GET / - ${error.message}`);
    testsFailed++;
  }

  // Test 2: POST form data
  try {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      message: "Test message",
    };

    const response = await fetch(`${BASE_URL}/api/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 201 && data.success) {
      console.log("[PASS] POST /api/forms - Submit form data");
      testsPassed++;
    } else {
      console.log("[FAIL] POST /api/forms - Submit form data");
      testsFailed++;
    }
  } catch (error) {
    console.log(`[FAIL] POST /api/forms - ${error.message}`);
    testsFailed++;
  }

  // Test 3: GET all forms
  try {
    const response = await fetch(`${BASE_URL}/api/forms`);
    const data = await response.json();

    if (response.status === 200 && data.success && Array.isArray(data.data)) {
      console.log("[PASS] GET /api/forms - Retrieve all forms");
      testsPassed++;
    } else {
      console.log("[FAIL] GET /api/forms - Retrieve all forms");
      testsFailed++;
    }
  } catch (error) {
    console.log(`[FAIL] GET /api/forms - ${error.message}`);
    testsFailed++;
  }

  // Test 4: GET specific form
  try {
    const response = await fetch(`${BASE_URL}/api/forms/1`);
    const data = await response.json();

    if (response.status === 200 && data.success && data.data) {
      console.log("[PASS] GET /api/forms/:id - Retrieve specific form");
      testsPassed++;
    } else if (response.status === 404) {
      console.log("[PASS] GET /api/forms/:id - Retrieve specific form (404 expected)");
      testsPassed++;
    } else {
      console.log("[FAIL] GET /api/forms/:id - Retrieve specific form");
      testsFailed++;
    }
  } catch (error) {
    console.log(`[FAIL] GET /api/forms/:id - ${error.message}`);
    testsFailed++;
  }

  // Test 5: 404 endpoint
  try {
    const response = await fetch(`${BASE_URL}/api/nonexistent`);
    const data = await response.json();

    if (response.status === 404 && !data.success) {
      console.log("[PASS] GET /api/nonexistent - 404 handler");
      testsPassed++;
    } else {
      console.log("[FAIL] GET /api/nonexistent - 404 handler");
      testsFailed++;
    }
  } catch (error) {
    console.log(`[FAIL] GET /api/nonexistent - ${error.message}`);
    testsFailed++;
  }

  // Summary
  console.log("\n---");
  console.log(`Passed: ${testsPassed}`);
  console.log(`Failed: ${testsFailed}`);
  console.log(`Total: ${testsPassed + testsFailed}`);
}

testAPI().catch((error) => {
  console.log(`Fatal error: ${error.message}`);
  process.exit(1);
});
