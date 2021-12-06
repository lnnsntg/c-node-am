const mongoose = require("mongoose");

//-------------------------------------------------------------

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/task-manager-api");
    console.log("Connect to database");
  } catch (error) {
    console.log("Connection to database failed");
    return "failure";
  }
}

async function disconnect() {
  await mongoose.disconnect()
    .then(() => console.log('Disconnect'));
}

//-------------------------------------------------------------

module.exports = { connect, disconnect };