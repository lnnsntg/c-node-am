const mongoose = require("mongoose");

//-------------------------------------------------------------

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/task-manager-api");
    console.log("Connect to database");
  } catch (error) {
    console.log("Connection to database failed");
    return "failure"
  }
  const me = new User({
    name: "Lenin",
    email: "lenin@lenin.app",
    password: 'ppasswordd',
  });

  await me.save()
    .then((d) => console.log(d))
    .catch((error) => console.log('The fields could not be saved', error.message))

  await mongoose.disconnect()
    .then(() => console.log('Disconnect'))
}
main()

//-------------------------------------------------------------

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/task-manager-api");
    console.log("Connect to database");
  } catch (error) {
    console.log("Connection to database failed");
    return "failure"
  }
  await task.save()
    .then((d) => console.log(d))
    .then(() => console.log("Done.!"))
    .catch((error) => console.log('The fields could not be saved', error.message))

  await mongoose.disconnect()
    .then(() => console.log('Disconnect'))
  return 'End'
}
main().then(console.log)


// await me.save()
// .then((d) => console.log(d))
// .catch((error) => console.log('The fields could not be saved', error.message))

// await mongoose.disconnect()
// .then(() => console.log('Disconnect'))