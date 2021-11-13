// CRUD create read update delete
const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://127.0.0.1:27017";
//const id = new ObjectId();
const client = new MongoClient(url);
const dbName = "task-manager";
const db = client.db(dbName);

//---------------------------------------------------------------------

// async function insertar() {
//     try {
//         await client
//             .connect()
//             .then(() => console.log("Connected successfully to server"));
//     } catch (error) {
//         console.log("Failed connection");
//         return
//     }


//---------------------------------------------------------------------


// async function insertar() {
//     try {
//         await client
//             .connect()
//             .then(() => console.log("Connected successfully to server"));
//     } catch (error) {
//         console.log("Failed connection");
//         return
//     }
//     try {
//          db.collection("tasks")
//             .insertMany([
//                 {
//                     description: "Clean the house",
//                     completed: true,
//                 },
//                 {
//                     description: "Renew inspection",
//                     completed: false,
//                 },
//                 {
//                     description: "Plot plants",
//                     completed: false,
//                 },
//             ])
//             .then((resp) => {
//                 console.log("Successful fields insertion");
//                 console.log(resp.insertedIds);
//             });
//     } catch (error) {
//         console.log("Unable to insert task");
//     }
// }
// insertar();


//---------------------------------------------------------------------

/*
async function insertar3() {
    try {
        await client
            .connect()
            .then(() => console.log("Connected successfully to server"));
    } catch (error) {
        console.log("Failed connection");
        return
    }
    try {
         db.collection("users")
            .insertOne({name: 'Lenin', age: 48})
            .then((resp) => {
                console.log("Successful fields insertion");
                console.log(resp.insertedId);
            });
    } catch (error) {
        console.log("Unable to insert task");
    }
}
insertar3();
 */

//---------------------------------------------------------------------

// async function main() {
//   try {
//     await client
//       .connect()
//       .then(() => console.log("Connected successfully to server"));
//   } catch (error) {
//     console.log("Failed connection");
//     return;
//   }

//   try {
//     await db
//       .collection("tasks")
//       .findOne({ _id: ObjectId("618f1db33da78fc5afe4c7b3") })
//       .then((n)=>console.log(n));
//   } catch (error) {
//     console.log("No se pudo completar la operación en findOne");
//   }

//   try {
//     await db
//       .collection("tasks")
//       .find({ completed: false })
//       .toArray()
//       .then(console.log);
//   } catch (error) {
//     console.log("No se pudo completar la operación en find a secas");
//   }
// }
// main();

