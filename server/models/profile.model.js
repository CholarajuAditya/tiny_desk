import mongoose from "mongoose"
import addressSchema from "./address.schema.js"

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide company name"]
        },
        gstin: {
            type: String,
            required: [true, "please provide GSTIN"],
            max: 15
        },
        address: {
            type: addressSchema,
            required: [true, "please provide company address"]
        },
        phone: {
            type: String,
            required: [true, "please provide company number"],
            max: [15, "number is not valid"]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }
)

const Profile = mongoose.model("Profile", profileSchema)

export { Profile }