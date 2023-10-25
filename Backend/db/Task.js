const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    task: String,
    userId: String,
    status: Boolean
});
module.exports = mongoose.model("Task", taskSchema);


