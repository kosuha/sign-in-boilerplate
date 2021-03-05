const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        minlength: 5,
        unique: 1
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', (next) => {
    var user = this;

    // password가 변경 될 때만 암호화
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (error, salt) => {
            if (error) return next(error);
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) return next(error);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
})

userSchema.methods.comparePassword = (plainPassword, cb) => {
    bcrypt.compare(plainPassword, this.password, (error, isMatch) => {
        if (error) return cb(error),
            cb(null, isMatch);

    })
}

userSchema.methods.generateToken = (cb) => {
    var user = this;
    var token = jwt.sign(user._id, 'secretToken');
    user.token = token;
    user.save((error, user) => {
        if (error) {
            return cb(error);
        }
        cb(null, user);
    });
}

const User = mongoose.model('User', userSchema);

module.exports = { User };