import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import Uuid from 'uuid-lib';

const CompanyDataSchema = new Schema({
    Name: {
        type: String,
        required: [true, 'Company Name is required']
    },
    Address1: {
        type: String,
        required: [true, 'Address is required']
    },
    City: {
        type: String,
        required: [true, 'City is required']
    },
    State: {
        type: String,
        required: [true, 'State is required']
    },
    Country: {
        type: String,
        required: [true, 'Country is required']
    },
    ZipCode: {
        type: String
    },
    Secretkey: {
        type: String
    },
    AppContext: {
        type: [String]
    },
    PhoneNumber: {
        type: [String]
    },
    DateCreated: {
        type: Date,
        default: new Date()
    }
});


export default mongoose.model('CompanyData', CompanyDataSchema);