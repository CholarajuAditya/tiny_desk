import { Profile } from "../models/profile.model.js"

const createProfile = async(req,res) => {
    let data = req.body
    data.createdBy = req.user.userId
    const profile = await Profile.create(data)
    if(profile)
        return res.status(200).json({message: "profile created succesffully"})
    res.status(500).json({message: "profile creation failed"})
} 

const getProfile = async(req,res) => {
    const { userId } = req.user
    const profile = await Profile.findOne({ createdBy: userId})
    if(profile)
        return res.status(200).json(profile)
    res.status(500).json({message: "profile fetch failed"})
}

export { createProfile,
         getProfile,        
}