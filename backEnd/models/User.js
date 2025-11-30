const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'client'
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema)