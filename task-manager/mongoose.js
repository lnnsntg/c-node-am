const mongoose = require("mongoose");
const validator = require('validator');

//-------------------------------------------------------------

/* 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (validator.isEmail(value) === false) {
        throw new Error('Email is not valid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error('You must provide a password')
      }
      if(value.includes('password')){
        throw new Error("The password can not contain 'password'")
      }
      if (!validator.isLength(value, { min: 8 })) {
        throw new Error("The password must have a minimum of 6 characters")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
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
 */
//-------------------------------------------------------------
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  }
})
const Task = mongoose.model('Task', taskSchema)

const task = new Task({
  description: "Rere"
})

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