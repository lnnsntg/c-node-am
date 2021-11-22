const express = require('express');
const { connect, disconnect } = require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())

app.post("/users", async (req, res) => {
    const user = new User(req.body)

    await connect()

    await user.save().then(() => {
        res.send(user)
    }).catch((error) => {
        res.status(400).send(error.message)
    })
    await disconnect()
});

app.get('/users', async (req, res) => {
    await connect()
    await User.find()
        .then((d) => {
            res.send(d)
        }).catch((error) => {
            res.status(500).send(error.message)
        })

    await disconnect()
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    await connect()

    await User.findById(_id)
        .then((user) => { res.send(user); console.log(user); })
        .catch((error) => {
            res.status(500).send(error)
        })

    await disconnect()
})

app.post("/tasks", async (req, res) => {
    const task = new Task(req.body)

    await connect()

    await task.save().then(() => {
        res.send(task)
    }).catch((error) => {
        res.status(400).send(error.message)
    })
    await disconnect()
});

app.get('/tasks', async (req, res) => {
    await connect()
    await Task.find()
        .then((d) => {
            res.send(d)
        }).catch((error) => {
            res.status(500).send(error.message)
        })

    await disconnect()
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    await connect()
    await Task.findById(_id)
        .then((task) => {
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
        })
        .catch((error) => {
            res.status(404).send(error.message)
        })

    await disconnect()
})


app.listen(port, () => {
    console.log('Server running! at port -> ' + port);
});