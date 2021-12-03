const express = require('express');
const { connect, disconnect } = require("../db/mongoose");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
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

router.get("/tasks/:id", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
    await connect();
    const updates = Object.keys(req.body);
    const allowedUpdate = ['description', 'completed'];
    const isValidOperacion = updates.every((item) => allowedUpdate.includes(item));
    if (!isValidOperacion) {
        return res.status(404).send({ error: 'Invalid updates!' });
    }
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true,
        // });
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach(item => task[item] = req.body[item]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
    disconnect();
});

//----------------------------------------------------------

router.delete('/tasks/:id', async (req, res) => {
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
router.delete('/tasks/:id', async (req, res) => {
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



module.exports = router;