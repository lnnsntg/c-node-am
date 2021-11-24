const express = require('express');
const router = new express.Router();
const User = require("../models/user");
const { connect, disconnect } = require("../db/mongoose");

//----------------------------------------------------------

router.post("/users", async (req, res) => {
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

router.get("/users", async (req, res) => {
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

router.get("/users/:id", async (req, res) => {
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

router.patch("/users/:id", async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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


module.exports = router;