// CRUD create read update delete
const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://127.0.0.1:27017";
//const id = new ObjectId();
const client = new MongoClient(url);
//const dbName = "myProject";
// const db = client.db(dbName);

//---------------------------------------------------------------------
//                    DELETE                    <<<<<<<<<<

async function erase() {
  const dbName = "myProject";
  const db = client.db(dbName);
  try {
    await client
      .connect()
      .then(() => console.log("Connected successfully to server"));
  } catch (error) {
    console.log("Failed connection");
    return;
  }

  try {
    await db
      .collection("documents")
      .deleteMany({ a: 3 })
      .then((deleteCout) => {
        console.log(deleteCout);
      });
  } catch (error) {
    console.log("Can not erase fields");
  } finally {
    await client.close();
  }
}
erase();

//---------------------------------------------------------------------

// async function main() {
//   const dbName = 'myProject';
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('documents');

//   // the following code examples can be pasted here...
//   const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
//   console.log('Inserted documents =>', insertResult);

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

//---------------------------------------------------------------------

// client
//   .connect()
//   .then(
//     () => console.log("Connected successfully to server"),
//     db
//       .collection("users")
//       .updateOne(
//         { _id: ObjectId("619089649d1536266015f331") },
//         {
//           $set: {
//             age: 36,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Successful fields insertion");
//         console.log(res);
//         client.close();
//       })
//       .catch((error) => {
//         console.log("Unable to insert user");
//       })
//       .finally(client.close())
//   )
//   .catch((error) => {
//     console.log("Failed connection");
//   });

// async function update() {
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
//       .collection("users")
//       .updateOne(
//         { _id: ObjectId("619089649d1536266015f331") },
//         {
//           $set: {
//             age: 37
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Successful fields insertion");
//         console.log(res.upsertedId);
//       });
//   } catch (error) {
//     console.log("Unable to insert user");
//   } finally {
//     await client.close();
//   }
// }
// update();

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
