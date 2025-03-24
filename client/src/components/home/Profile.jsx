import  { useState, useEffect } from "react"
import axios from "axios"
import Loading from "./Loading.jsx"
const Profile = () => {
  const [loading, setLoading] = useState(true) 
  const [profileCreated, setProfileCreated] = useState(false)
  const[profileData, setProfileData] = useState(
    {
      name: "",
      gstin: "",
      phone: ""
    }
  )
  const[addressData, setAddressData] = useState(
    {
      street: "",
      area: "",
      city: "",
      country: "",
      pincode: ""
    },
  )

  useEffect(() => {
    const getProfile = async() => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("/api/profile", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(response.status === 200){
          const { name, gstin, phone, address}= response.data
          setProfileData({
            name,
            gstin,
            phone,
          })
          setAddressData({
            street: address.street,
            area: address.area, 
            city: address.city,
            country: address.country,
            pincode: address.pincode
          })
          
          setProfileCreated(true)
        }
      } catch (error) {
        window.alert(error.response.data.message)
      } finally{
        setLoading(false)
      }
    }

    getProfile()
  }, [])

  const handleProfileChange = (e) => {
    const { name, value }  = e.target
    setProfileData(( prevData) => (
      {
        ...prevData,
        [name]: value
      }
    ))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddressData(( prevData) => (
      {
        ...prevData,
        [name]: value
      }
    ))
  }

  const createProfile = async(e) => {
    e.preventDefault()
    try{
      const token = localStorage.getItem("token")
      profileData.gstin = profileData.gstin.toUpperCase()
      const data = {...profileData, address: addressData}
      const response = await axios.post("/api/profile", data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      
      if(response.status == 200){
        setProfileCreated(true)
        window.alert(response.data.message)
      }
    }
    catch(err){
      window.alert(err.response.data.message)
    }
  }

  return (
    <> 
      {loading && <Loading/>}
      {!loading && !profileCreated && (
        <form onSubmit={createProfile}>
          { Object.keys(profileData).map( (key,index) => (
            <div key={index}>
              <label > {key} : <input  type="text" name={key} value={profileData[key]} onChange={handleProfileChange}></input></label>
              <br />
            </div>
          )) }
          { Object.keys(addressData).map( (key,index) => (
            <div key={index}>
              <label > {key} : <input  type="text" name={key} value={addressData[key]} onChange={handleAddressChange}></input></label>
              <br />
            </div>
          )) }
          <button>Submit</button>
        </form>
      )}
      {!loading && profileCreated && (
        <div >
          { Object.entries(profileData).map( (field, index) => (
            <div className="text-black" key={index}>{field[0]} : {field[1]}</div>
          ))}   
          { Object.entries(addressData).map( (field, index) => (
            <div className="text-black" key={index}>{field[0]} : {field[1]}</div>
          ))}               
        </div>
      )}
    </>
  )
}

export default Profile