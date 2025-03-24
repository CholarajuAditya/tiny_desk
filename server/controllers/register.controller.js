import { User } from "../models/user.model.js"

const registerUser = async(req,res) => {
    
    const data = req.body
    const user = await User.create(data)
    if(user)
        return res.status(200).json({ message: "user created successfully" })
    else
        res.status(500).json({  message: "user creation failed" })
}

export {registerUser}

