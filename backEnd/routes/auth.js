const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = "jbu$fPhG&472GyuMg3+#PhG&472Gy" //random string

// @route POST /api/auth/register
// @desc Register user

router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                msg: 'User already exists'
            })
        }
        user = new User({name, email, password});
        //hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //create jwt payload
        const payload = {user: {id: user.id, role: user.role}};
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h'}, // Token expires in 1 hr
            (err, token) => {
                if(err) throw err;
                res.json({token, user: user.name})
            }
        );
    } catch(err) {
        console.error(err.message);
        res.status(500). send('Server error');
    }
});

// @route POST /api/auth/login
// @desc Authenticate user and get token

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        // Create JWT payoad
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };
        jwt.sign(
            payload,
            JWT_SECRET,
            {expiresIn: '1h'}, // Token expires in 1 hr
            (err, token) => {
                if (err) throw err;
                res.json({token, user: user.name}) // send token to client
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500). send('Server error');
    }
})

module.exports = router;