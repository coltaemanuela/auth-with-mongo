var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require('bcrypt');

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
    

    userSchema.pre('save', function (next) {
        var user = this;
        if (this.isModified('password') || this.isNew) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) {
                        return next(err);
                    }
                    user.password = hash;
                    next();
                });
            });
        } else {
            return next();
        }
    });
     
    userSchema.methods.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };

module.exports = mongoose.model('User', userSchema);

