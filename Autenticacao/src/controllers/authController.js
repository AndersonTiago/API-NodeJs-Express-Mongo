const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const User = require('../models/User');
const router = express.Router();

function generateToken(params = {}){
    //  id + segredo = 123456
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async(req, res) => {
    try {
        const {email} = req.body

        if (await User.findOne({email}))
            return res.status(400).send({error: 'User already exists'})
        
        const user = await User.create(req.body);

        user.password = undefined

        return res.send({
                    user,
                    token:generateToken({id:user.id}),
                });

    } catch(err) {
        return res.status(400).send({error: 'Registration failed'});
    }
});


router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email}).select('+password')

    if(!user)
        return res.status(400).send({error: 'User not found'})
    
    // fazendo a comparação da senha do input com a do DB
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Invalid password'})

    // não mostrar o pass na listagem
    user.password = undefined;

    res.send({
            user, 
            token: generateToken({id: user.id}),
        });
});
module.exports = app => app.use('/auth', router)