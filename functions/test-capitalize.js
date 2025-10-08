/**
 * Test script to demonstrate the capitalization logic
 * Run with: node test-capitalize.js
 */

// Helper function to capitalize strings (same as in Cloud Function)
function capitalizeString(str) {
  if (typeof str !== "string") return str;
  return str.toUpperCase();
}

// Sample book data (as it would be entered by user)
const sampleBook = {
  name: "the great gatsby",
  author: "f scott fitzgerald",
  genre: "fiction",
  description: "a classic american novel",
  isbn: 9780743273565,
  publishYear: 1925,
  copies: 3,
};

console.log("=".repeat(60));
console.log("TESTING CLOUD FUNCTION CAPITALIZATION LOGIC");
console.log("=".repeat(60));

console.log("\n📖 ORIGINAL BOOK DATA (as entered by user):");
console.log(JSON.stringify(sampleBook, null, 2));

// Simulate what the Cloud Function does
const updatedData = {};
let hasChanges = false;

if (sampleBook.name && typeof sampleBook.name === "string") {
  const capitalized = capitalizeString(sampleBook.name);
  if (capitalized !== sampleBook.name) {
    updatedData.name = capitalized;
    hasChanges = true;
  }
}

if (sampleBook.author && typeof sampleBook.author === "string") {
  const capitalized = capitalizeString(sampleBook.author);
  if (capitalized !== sampleBook.author) {
    updatedData.author = capitalized;
    hasChanges = true;
  }
}

if (sampleBook.genre && typeof sampleBook.genre === "string") {
  const capitalized = capitalizeString(sampleBook.genre);
  if (capitalized !== sampleBook.genre) {
    updatedData.genre = capitalized;
    hasChanges = true;
  }
}

if (sampleBook.description && typeof sampleBook.description === "string") {
  const capitalized = capitalizeString(sampleBook.description);
  if (capitalized !== sampleBook.description) {
    updatedData.description = capitalized;
    hasChanges = true;
  }
}

console.log("\n✨ CAPITALIZED FIELDS (what Cloud Function updates):");
console.log(JSON.stringify(updatedData, null, 2));

console.log("\n📚 FINAL BOOK DATA (as stored in Firestore):");
const finalBook = {...sampleBook, ...updatedData};
console.log(JSON.stringify(finalBook, null, 2));

console.log("\n" + "=".repeat(60));
console.log("✅ VERIFICATION:");
console.log("   - Name capitalized:", sampleBook.name, "→", updatedData.name);
console.log("   - Author capitalized:", sampleBook.author, "→", updatedData.author);
console.log("   - Genre capitalized:", sampleBook.genre, "→", updatedData.genre);
console.log("   - Description capitalized:", sampleBook.description, "→", updatedData.description);
console.log("   - ISBN unchanged:", finalBook.isbn);
console.log("   - Year unchanged:", finalBook.publishYear);
console.log("=".repeat(60));
