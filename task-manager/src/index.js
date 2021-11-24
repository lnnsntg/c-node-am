const express = require("express");
const bcrypt = require('bcryptjs')
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

//----------------------------------------------------------

const myfunction = async () => {
    const password = "Red12345!"
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password);
    console.log(hashedPassword);
    isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(isMatch);
}
myfunction()
//----------------------------------------------------------

app.listen(port, () => {
    console.log("Server running! at port -> " + port);
});