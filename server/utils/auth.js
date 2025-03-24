import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const auth = async(req,res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) return res.status(401)
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded
        const userId = await User.findOne({email: req.user.user}).select("_id")
        req.user.userId = userId
        next()
    } catch (err) {
        next(err)
    }
}

export { auth }

