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
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

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
        message: `Successfully counted ${count} books`
      });
      
    } catch (error) {
      logger.error("Error counting books:", error);
      
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to count books"
      });
    }
  });
});