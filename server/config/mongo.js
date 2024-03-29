require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// test run
// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

// --------------------------------------- 

// connect to mongo
// async function connectToMongoDB() {
//   try {
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();
//     console.log('Connected to MongoDB');

//     return client.db("GC01_IG");
//   } catch (error) {
//     console.error('Failed connection to MongoDB:', error);
//     throw error;
//   }
// }
// connectToMongoDB()


// -------------------------------------

// adding some User Data (Create)
// async function main() {
//   try {
//     await client.connect();
//     console.log("connected to MongoDB");

//     const database = client.db("GC01_IG");
//     const collection = database.collection("User");

//     const docs = [
//       {
//         id: 1,
//         name: 'Bond',
//         username: 'James Bond',
//         email: 'james.bond@mi6.gov.uk',
//         password: 'bond007'
//       },
//       {
//         id: 2,
//         name: 'Q branch',
//         username: 'Qbranch',
//         email: 'qbranch@mi6.gov.uk',
//         password: 'Qbranch123'
//       }
//     ]

//     const result = await collection.insertMany(docs);
//     console.log(`${result.insertedCount} documents were inserted`);
//   } catch {
//     console.error("Failed connection to MongoDB")
//   } finally {
//     await client.close();
//     console.log("connection closed from MongoDB");
//   }
// }
// main()

const database = client.db("GC01_IG");

module.exports = {
  database
}