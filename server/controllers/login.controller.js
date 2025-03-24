import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const confirmLogin = async (req,res) => {
    let { email, password } = req.body
    email = email.toLowerCase()
    const user = await User.findOne({email})
    
    const checked = user && await bcrypt.compare(password, user.password)
    if(checked){
        const token = jwt.sign({user: email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2d'})
        return res.status(200).json({token ,message: "login successful"})
    }
    res.status(401).json({message: "please enter correct details"})
}


export{confirmLogin}