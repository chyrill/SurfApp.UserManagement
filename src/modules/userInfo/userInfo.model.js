import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const UserInfoSchema = new Schema({
    FirstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    LastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    MiddleName: {
        type: String
    },
    ProfilePicture: {
      type: String
    },
    Address1: {
        type: String,
        required: [true, 'Address 1 is required']
    },
    Address2: {
        type: String
    },
    State: {
        type: String,
        required: [true, 'State is required']
    },
    City: {
        type: String,
        required: [true, 'City is required']
    },
    Country: {
        type: String,
        required: [true, 'Country is required']
    },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not valid email'
        }

    },
    PhoneNumber: {
        type: String,
        required: [true, 'Phone Number is required']
    },
    DateCreated: {
        type: Date
    },
    Context:{
      type: String,
    },
    Others:{
      type: Object
    },
    DateUpdated: {
        type: Date
    }
});

export default mongoose.model('UserInfo', UserInfoSchema);
