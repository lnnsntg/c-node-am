const mongoose = require("mongoose");
const validator = require('validator');

//-------------------------------------------------------------

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error('You must provide a password')
      }
    }
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) {
        throw new Error('Age must be a positive number')
      }
    }
  }
})

const User = mongoose.model('User', userSchema)

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/task-manager-api");
    console.log("Connect to database");
  } catch (error) {
    console.log("Connection to database failed");
    return "failure"
  }

  await me.save()
    .then((d) => console.log(d))
    .catch((error) => console.log('The fields could not be saved', error.message))

  await mongoose.disconnect()
    .then(() => console.log('Disconnect'))
}
//main()

//-------------------------------------------------------------

// const Tasks = mongoose.model("Tasks", {
//   description: {
//     type: String
//   },
//   completed: {
//     type: Boolean
//   }
// })

// const task = new Tasks({
//   description: "Go to shower",
//   completed: false
// });

// main().then(console.log)

// async function main() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/task-manager-api");
//     console.log("Connect to database");
//   } catch (error) {
//     console.log("Connection to database failed");
//     return "failure"
//   }

//   try {
//     await task.save()
//       .then((d) => console.log(d))
//       .then(() => console.log("Done.!"))
//   } catch (error) {
//     (error) => console.log('The fields could not be saved', error)
//   }
//   finally {
//     await mongoose.disconnect()
//       .then(() => console.log('Disconnect'))
//     return 'End'
//   }
// }