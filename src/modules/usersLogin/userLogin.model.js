import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync } from 'bcrypt-nodejs';

const UserLoginSchema = new Schema({
    UserInfo_Id: {
        type: String,
        required: [true]
    },
    Email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        index: false,
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    Password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minLength: [6, 'Password minimum length is 6!']
    },
    Context: {
        type: String
    }

});

UserLoginSchema.pre('save', function(next) {
    if (this.isModified('Password')) {
        this.Password = this._hashPassword(this.Password);
    }

    return next();
});

UserLoginSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    }
};

export default mongoose.model('UserLogin', UserLoginSchema);