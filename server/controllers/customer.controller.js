import Customer from "../models/customer.model.js"

const getCustomers =  async(req,res) => {
    const user = req.user.userId
    const customerList = await Customer.find({createdBy: user})
    if(!customerList){
        return res.status(500).json({message: "could not fetch customer list"})
    }
    
    res.status(200).json(customerList)
}

const createCustomer =  async(req,res) => {
    const data = req.body
    data.createdBy = req.user.userId
    const customer = await Customer.create(data)
    if(!customer){
        return res.status(500).json({message: "customer creation failed"})
    }
    res.status(200).json(customer)
}

const getCustomer = async(req,res) => {
    const { id } = req.params
    const customer = await Customer.findById(id)
    if(!customer){
        return res.status(404).json({message: "failed to fetch customer details"})
    }
    res.status(200).json(customer)
}

const deleteCustomer =  async(req,res) => {
    const id = req.params.id
    const result = await Customer.findByIdAndDelete(id)
    if(!result){
        return res.status(500).json({message: "deletion failed"})
    }
    res.status(200).json({message: "customer deleted successfully"})
}

const updateCustomer = async(req,res) => {
    const { id } = req.params    
    const result = await Customer.findByIdAndUpdate(id, req.body, {new: true})
    if(result){
        return res.status(200).json(result)
    }
    return res.status(500).json({message: "updating user failed"})
}

export {
    getCustomers,
    createCustomer,
    deleteCustomer,
    getCustomer,
    updateCustomer
}
