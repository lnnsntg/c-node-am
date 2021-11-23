const express = require("express");
const { connect, disconnect } = require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

//----------------------------------------------------------

app.post("/users", async (req, res) => {
    const user = new User(req.body);
    await connect();
    await user
        .save()
        .then(() => {
            res.status(201).send(user);
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
    await disconnect();
});

//----------------------------------------------------------

app.get("/users", async (req, res) => {
    await connect();
    await User.find()
        .then((d) => {
            res.send(d);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
    await disconnect();
});

//----------------------------------------------------------

app.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    await connect();
    await User.findById(_id)
        .then((user) => {
            res.send(user);
            console.log(user);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
    await disconnect();
});

//----------------------------------------------------------

app.patch("/users/:id", async (req, res) => {
    await connect();
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdate = ['name', 'email', 'password', 'age'];
    const isValidOperacion = updates.every((updates) => {
        return allowedUpdate.includes(updates);
    });
    console.log(isValidOperacion);
    if (!isValidOperacion) {
        return res.status(404).send({ error: 'Invalid updates!' });
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
    disconnect();
});

//----------------------------------------------------------

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await connect();
    await User.findOneAndDelete({ _id: id })
        .then((user) => {
            res.send(user);
            console.log(user);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
    await disconnect();
});

//----------------------------------------------------------

app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await connect();
    await task
        .save()
        .then(() => {
            res.send(task);
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
    await disconnect();
});

//----------------------------------------------------------

app.get("/tasks", async (req, res) => {
    await connect();
    await Task.find()
        .then((d) => {
            res.send(d);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
    await disconnect();
});

//----------------------------------------------------------

app.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;
    await connect();
    await Task.findById(_id)
        .then((task) => {
            if (!task) {
                return res.status(404).send();
            }
            res.send(task);
        })
        .catch((error) => {
            res.status(404).send(error.message);
        });
    await disconnect();
});

//----------------------------------------------------------

app.patch("/tasks/:id", async (req, res) => {
    await connect();
    const updates = Object.keys(req.body);
    const allowedUpdate = ['description', 'completed'];
    const isValidOperacion = updates.every((item) => allowedUpdate.includes(item));
    if (!isValidOperacion) {
        return res.status(404).send({ error: 'Invalid updates!' });
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
    disconnect();
});

//----------------------------------------------------------

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    await connect();

    await Task.findOneAndDelete({ _id: id })
        .then((task) => {
            if (!task) {
                return res.status(404).send();
            }
            res.send(task);
            console.log(task);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
    await disconnect();
});

/* 
app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    await connect();
    try {
        const task = await Task.findOneAndDelete({ _id: id });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
        console.log(task);

    } catch (error) {
        res.status(500).send(error);
    }
    await disconnect();
});
 */


//----------------------------------------------------------

app.listen(port, () => {
    console.log("Server running! at port -> " + port);
});