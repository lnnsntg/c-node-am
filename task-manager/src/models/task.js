const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})
const Task = mongoose.model('Task', taskSchema);

module.export = Task;