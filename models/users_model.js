var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true
  },
    email:  {
        type: String,
        index:true,
        unique: true,
        match: /^[a-z0-9\.]+\@[a-z0-9\.]+$/i
        },
    password:{
        type: String,
        required:true
        }
});

module.exports = mongoose.model('User', userSchema);

