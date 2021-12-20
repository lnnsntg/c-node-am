const express = require('express');
const router = new express.Router();
const User = require("../models/user");
const auth = require('../middleware/auth')
//----------------------------------------------------------

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

//----------------------------------------------------------

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
            .then(async user => {
                const token = await user.generateAuthToken();
                res.status(201).send({ user, token });
            });
    }
    catch (error) {
        res.status(400).send(error);
    }

});

//----------------------------------------------------------

router.get("/users", auth, async (req, res) => {
    await User.find()
        .then((d) => {
            res.send(d);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });

});

//----------------------------------------------------------

router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    await User.findById(_id)
        .then((user) => {
            res.send(user);
            console.log(user);
        })
        .catch((error) => {
            res.status(500).send(error);
        });

});

//----------------------------------------------------------

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdate = ['name', 'email', 'password', 'age'];
    const isValidOperacion = updates.every((updates) => {
        return allowedUpdate.includes(updates);
    });
    console.log("CLG IN ROUTERS/USER.JS FUNCTION ROUTER.PATCH", isValidOperacion);
    if (!isValidOperacion) {
        return res.status(404).send({ error: 'Invalid updates!' });
    }
    try {
        const user = await User.findById(req.params.id);
        updates.forEach((item) => user[item] = req.body[item]);
        await user.save();
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }
    catch (error) {
        res.status(400).send(error)
    }
})

//----------------------------------------------------------

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await User.findOneAndDelete({ _id: id })
        .then((user) => {
            res.send(user);
            console.log(user);
        })
        .catch((error) => {
            res.status(500).send(error);
        });

});


module.exports = router;