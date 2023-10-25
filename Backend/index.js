const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');
require('./db/config');
const User = require('./db/User');
const Task = require('./db/Task');

const app = express();
app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    let users = new User(req.body);
    let result = await users.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})
app.post('/login', async (req, res) => {

    if (req.body.password && req.body.email) {
        const user = await User.findOne(req.body).select("-password");
        console.log(user)
        if (user) {
            res.send(user);
        } else {
            res.send(JSON.stringify({ "msg": "Enter correct details" }))
        }
    } else {
        res.send(JSON.stringify({ "msg": "Enter both details" }));
    }
})
app.post('/addtask', async (req, res) => {
    let task = new Task(req.body);
    let result = await task.save();
    console.log(result)
    res.send(result);
})

app.get('/tasks', async (req, res) => {
    let tasks = await Task.find()
    console.log(tasks)
    //console.log(typeof products)
    if (tasks) {
        res.send(tasks)
    } else {
        res.send({ result: "No product found" })
    }
});

app.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id)
    const result = await Task.deleteOne({ _id: req.params.id })
    res.send(result.acknowledged)
});
app.put('/update/:id', async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;
    console.log(updateData);
    const result = await Task.findOneAndUpdate(
        { _id: productId },
        { $set: updateData },
        { new: true } // To return the updated document
    );
    res.send(result)
});
app.get('/', (req, res) => {
    res.send("backend is ready..");
});
app.listen(8000, () => {
    console.log('Listening at port 8000');
});

