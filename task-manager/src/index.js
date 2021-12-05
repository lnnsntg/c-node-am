const express = require("express");
const jwt = require('jsonwebtoken')
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

//----------------------------------------------------------

// const myFunction = async ( ) => {
//     const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days'});
//     console.log(token);
//     const verifyToken = jwt.verify(token, 'thisismynewcourse')
//     console.log(verifyToken);
// }
// myFunction()

//----------------------------------------------------------

app.listen(port, () => {
    console.log("Server running! at port -> " + port);
});