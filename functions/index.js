/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

// Initialize Firebase Admin
admin.initializeApp();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * Helper function to capitalize strings
 * @param {string} str - The string to capitalize
 * @return {string} The capitalized string
 */
function capitalizeString(str) {
  if (typeof str !== "string") return str;
  return str.toUpperCase();
}

// Cloud Function that triggers when a new book is added
// Automatically capitalizes text fields (name, author, etc.)
exports.capitalizeBookData = onDocumentCreated(
    "books/{bookId}",
    async (event) => {
      try {
        const snapshot = event.data;
        if (!snapshot) {
          logger.warn("No data associated with the event");
          return;
        }

        const bookData = snapshot.data();
        const bookId = event.params.bookId;

        logger.info(`New book document created with ID: ${bookId}`);
        logger.info(`Original data:`, bookData);

        const updatedData = {};
        let hasChanges = false;

        if (bookData.name && typeof bookData.name === "string") {
          const capitalized = capitalizeString(bookData.name);
          if (capitalized !== bookData.name) {
            updatedData.name = capitalized;
            hasChanges = true;
          }
        }

        if (bookData.author && typeof bookData.author === "string") {
          const capitalized = capitalizeString(bookData.author);
          if (capitalized !== bookData.author) {
            updatedData.author = capitalized;
            hasChanges = true;
          }
        }

        if (bookData.genre && typeof bookData.genre === "string") {
          const capitalized = capitalizeString(bookData.genre);
          if (capitalized !== bookData.author) {
            updatedData.genre = capitalized;
            hasChanges = true;
          }
        }

        if (bookData.description && typeof bookData.description === "string") {
          const capitalized = capitalizeString(bookData.description);
          if (capitalized !== bookData.description) {
            updatedData.description = capitalized;
            hasChanges = true;
          }
        }

        if (hasChanges) {
          logger.info(`Capitalizing fields for book ID: ${bookId}`);
          logger.info(`Updated data:`, updatedData);

          await admin.firestore().collection("books").doc(bookId)
              .update(updatedData);

          const bookName = updatedData.name || bookData.name;
          logger.info(`Successfully capitalized: ${bookName}`);
        } else {
          logger.info(`No capitalization needed: ${bookId}`);
        }
      } catch (error) {
        logger.error(`Error capitalizing book data:`, error);
        throw error;
      }
    });

// Cloud Function to count books in Firestore
exports.getBookCount = onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      logger.info("Starting getBookCount function");

      // Get reference to Firestore
      const db = admin.firestore();

      // Get the books collection
      const booksCollection = db.collection("books");

      // Get all documents in the collection
      const snapshot = await booksCollection.get();

      // Count the documents
      const count = snapshot.size;

      logger.info(`Found ${count} books in Firestore`);

      // Return the count
      res.status(200).json({
        success: true,
        count: count,
        message: `Successfully counted ${count} books`,
      });
    } catch (error) {
      logger.error("Error counting books:", error);

      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to count books",
      });
    }
  });
});
