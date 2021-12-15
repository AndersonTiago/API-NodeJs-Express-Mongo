const mongoose = require('../../database'); // importa a conexão com o BD
const bcrypt = require('bcryptjs'); // criptografar a senha

// Schema = campos no banco de dados
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    project: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Project',
       require: true, 
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;