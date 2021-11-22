const express = require('express')
const { connect, disconnect } = require('./db/mongoose')
const Task = require('./models/task')
const User = require('./models/user')
const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())

app.post("/tasks/:id", async (req, res) => {

    await connect()
    const id = req.params.id
    console.log(id);

    await Task.countDocuments({ completed: false })
        .then(task => {
            console.log(task)
        })
        .catch(e => console.log(e))
    await disconnect()
});

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndDelete()
}

app.listen(port, () => {
    console.log('Server running! at port -> ' + port);
});