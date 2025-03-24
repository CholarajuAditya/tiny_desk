import Vendor from "../models/vendor.model.js"

const getVendors = async(req,res) => {
    const user = req.user.userId
    const vendorList = await Vendor.find({createdBy: user})
    if(!vendorList){
        return res.status(500).json({message: "could not fetch vendor list"})
    }
    res.status(200).json(vendorList)
}
const createVendor = async(req,res) => {
    const data = req.body
    data.createdBy = req.user.userId
    const vendor = await Vendor.create(data)
    if(!vendor){
        return res.status(500).json({message: "vendor creation failed"})
    }
    res.status(200).json(vendor)
}

const getVendor = async(req,res) => {
    const { id } = req.params
    const vendor = await Vendor.findById(id)
    if(!Vendor){
        return res.status(404).json({message: "failed to fetch vendor details"})
    }
    res.status(200).json(vendor)
}

const deleteVendor =  async(req,res) => {
    const id = req.params.id
    const result = await Vendor.findByIdAndDelete(id)
    if(!result){
        return res.status(500).json({message: "deletion failed"})
    }
    res.status(200).json({message: "Vendor deleted successfully"})
}

const updateVendor = async(req,res) => {
    const { id } = req.params    
    const result = await Vendor.findByIdAndUpdate(id, req.body, {new: true})
    if(result){
        return res.status(200).json(result)
    }
    return res.status(500).json({message: "updating user failed"})
}



export {
    getVendors,
    createVendor,
    getVendor,
    deleteVendor,
    updateVendor
}
