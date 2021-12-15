const mongoose = require('../../database'); // importa a conexão com o BD
const bcrypt = require('bcryptjs'); // criptografar a senha

// Schema = campos no banco de dados
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    
})

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;