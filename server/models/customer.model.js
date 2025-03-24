import mongoose from "mongoose"
import addressSchema from "./address.schema.js"

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide customer name"]
        },
        gstin: {
            type: String,
            required: [true, "please provide customer PAN or GSTIN"],
            max: 15  
        },
        address: {
            type: addressSchema,
            required: [true, "please provide address"]
        },
        phone: {
            type: String,
            max: [15, "number is not valid"],
            required: [true, "please provide phone no."]
        },
        email:{
            type: String,
            required: [true, "please provide email"]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true, 
        },
    },
    { timestamps: true }
)

const Customer = mongoose.model("Customer", customerSchema)

export default Customer

