import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: [true, "please enter valid email"],
            unique: true
        },
        password:{
            type: String,
            required: [true, "please enter password"]
        },
    },
    {timestamps: true}
)

userSchema.pre("save", async function(next){
    this.email = this.email.toLowerCase()
    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("User", userSchema)
export { User }