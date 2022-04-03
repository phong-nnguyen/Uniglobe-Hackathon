const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    'email' : String,
    'username' : String, 
    'pass' : String
});

module.exports = mongoose.model('user', userSchema)