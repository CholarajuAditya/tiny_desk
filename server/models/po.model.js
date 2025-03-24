import mongoose from "mongoose"


const poSchema = mongoose.Schema(
    {
        poNo: {
            type: String,
            required: [true, "cannot raise  po without po number"]
        },
        vendor: {
            name: { type: String, required: true },
            gstin: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: String, required: true },
            phone: { type: String, required: true }
        },
        deliveryTo: {
            address: {type: String, required: true}
        },
        products: {
            type: [
                {   
                    id: String,
                    name: String,
                    quantity: String,
                    price: String,
                    total: String
                }
            ],
            required: [true, "Products are required"],
            validate: {
                validator: (products) => products.length > 0,
                message: "At least one product is required"
            }
        },
        total: {
            type: Number,
            required: [true, "total amount is required"]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true}
)

const PO = mongoose.model("PO", poSchema)

export default PO