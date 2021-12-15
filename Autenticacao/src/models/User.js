const mongoose = require('../database'); // importa a conexão com o BD
const bcrypt = require('bcryptjs'); // criptografar a senha

// Schema = campos no banco de dados
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// adicionando a criptografia no password
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    
    next()
})

const User = mongoose.model('User', UserSchema);

module.exports = User;