const mongoose = require("mongoose");
const validator2 = require("validator");
const bCrypt = require("bcrypt-nodejs");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator: function validator(email) {
                return validator2["default"].isEmail(email);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!']
    }
}, {
    timestamps: true
});


UserSchema.plugin(mongooseUniqueValidator, {
    message: '{VALUE} already taken!'
});

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }

    return next();
});
UserSchema.methods = {
    _hashPassword: function _hashPassword(password) {
        return (0, bCrypt.hashSync)(password);
    },
    authenticateUser: function authenticateUser(password) {
        return (0, bCrypt.compareSync)(password, this.password);
    },
    toAuthJSON: function toAuthJSON() {
        return {
            _id: this._id,
            email: this.email
        };
    },
    toJSON: function toJSON() {
        return {
            _id: this._id,
            name: this.name,
            email: this.email
        };
    }
};

module.exports["default"] = mongoose["default"].model('User', UserSchema);

