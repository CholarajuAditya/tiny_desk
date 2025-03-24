import mongoose from "mongoose"

const  addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, "please provide the street"]
    },
    area: {
        type: String,
        required: [true, "please provide the area"]
    },
    city: {
        type: String,
        required: [true, "please provide the city"]
    },
    country: {
        type: String,
        required: [true, "please provide the country"]
    },
    pincode: {
        type: String,
        required: [true, "please provide the pincode"]
    },

}, {_id: false})

export default addressSchema