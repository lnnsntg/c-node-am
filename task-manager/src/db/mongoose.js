const mongoose = require("mongoose");

//-------------------------------------------------------------
mongoose.connect('mongodb://127.0.0.1:27017/task-manager')
  .then(() => console.log("Conection  successful"))
  .catch((error) => console.log("Connection failure"))