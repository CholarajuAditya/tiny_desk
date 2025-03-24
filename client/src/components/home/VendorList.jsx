import { useState, useEffect, useMemo } from 'react'
import axios from "axios"
import Loading from "./Loading.jsx"


const VendorList = () => {
  const [loading, setLoading] = useState(true)
  const [vendorList, setVendorList] = useState([])
  const [createNew, setCreateNew] = useState(false)
  const [newVendorData, setNewVendorData] = useState({
    name: "",
    gstin: "",
    phone: "",
    email: ""
  })
  const [newVendorAddress, setNewVendorAddress] = useState(
    {
      street: "",
      area: "",
      city: "",
      country: "",
      pincode: ""
    },
  )
  const [query, setQuery] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("token")
    const getList = async() => {
      try {
        const list = await axios.get("/api/vendor", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(list.status === 200){
          setVendorList(list.data)
        }
      } catch (error) {
        window.alert(error.response.data.message)
      } finally{
        setLoading(false)
      }
    }

    getList()
  }, [])

  const createVendor = async(e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const data = {...newVendorData, address: newVendorAddress}
      const response = await axios.post("/api/vendor", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }  
      }) 
      if(response.status === 200){
        setVendorList(prev => ([...prev, response.data]))
        window.alert("vendor created succesfully")
      }
      
    } catch (error) {
      window.alert(error.response.data.message)
    }
  }

  const handleVendorData = (e) => {
    const {name, value} = e.target
    setNewVendorData( prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleVendorAddress = (e) => {
    const {name, value} = e.target
    setNewVendorAddress( prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const filteredVendorList = useMemo(() => (
      vendorList.filter((vendor) => vendor.name.toLowerCase().includes(query.toLowerCase()))
  ), [vendorList, query])

  return (
    <>
      {loading && (<Loading />)}
      {!loading && (
        <> 
          <input type="text" onChange={e => setQuery(e.target.value)}/>
          <button onClick={() => setCreateNew(!createNew)} className="cursor-pointer hover:bg-black hover:text-white">create new</button>
          {
            <form className={createNew ? "block" : "hidden"} onSubmit={createVendor}>
              { Object.keys(newVendorData).map((field, index) => (
                  <label className="block" key={index} htmlFor={field}>{field}: <input required  type="text" name={field} value={newVendorData[field]} onChange={handleVendorData}/></label>
              ))}
              { Object.keys(newVendorAddress).map((field, index) => (
                  <label className="block" key={index} htmlFor={field}>{field}: <input required type="text" name={field} value={newVendorAddress[field]} onChange={handleVendorAddress}/></label>
              ))}
              <button className="cursor-pointer hover:bg-black hover:text-white">submit</button>
            </form>
          }
          <div className="grid grid-cols-4">
            {filteredVendorList.map((vendor, index) => (
              <div className="border-1 w-[200px]" key={index}>
                <h1 className="text-2xl font-bold">{vendor.name}</h1>
                <p>{vendor.gtsin}</p>
                <p>{vendor.phone}</p>
                <p>{vendor.email}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default VendorList