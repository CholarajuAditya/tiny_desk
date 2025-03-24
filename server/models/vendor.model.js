import mongoose from "mongoose"
import addressSchema from "./address.schema.js"

const vendorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide vendor name"]
        },
        gstin: {
            type: String,
            required: [true, "please provide vendor GSTIN"]  ,
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

const Vendor = mongoose.model("Vendor", vendorSchema)

export default Vendor
