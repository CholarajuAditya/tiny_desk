import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ContactProfile = ({url, entityName, btnAction}) => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [contact, setContact] = useState();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false)
  const [newDetails, setNewDetails] = useState({
    name: "",
    gstin: "",
    phone: "",
    email: ""

  })
  const [newAddress, setNewAddress] = useState({
    street: "",
    area: "",
    city: "",
    country: "",
    pincode: ""
  })
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContact(response.data);
        const { name, gstin, phone, email, address } = response.data 
        setNewDetails(prev => (
          {
            ...prev,
            name,
            gstin,
            phone,
            email
          }
        ))
        setNewAddress(prev => (
          {
            ...prev,
            ...address
          }
        ))
      } catch (error) {
        console.error(`Error fetching ${entityName}:`, error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, entityName, url]);

  const handleDetails = async(e) => {
    const {name,value} = e.target
    setNewDetails(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleAddress = async(e) => {
    const {name,value} = e.target
    setNewAddress(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const upDateContact = async(e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token");
      const data = {...newDetails, address: {...newAddress}}
      const response = await axios.patch(`${url}/${id}`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(response.status === 200){
        setContact(response.data)
        window.alert(`${entityName} updated successfully`)
      }
    } catch (error) {
      window.alert(error.response.data.message)
    } finally{
      setUpdate(false)
    }
  }

  const deleteContact = async(e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${url}/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(response.status === 200){
        window.alert(`${entityName} deleted successfully`)
        navigate(`/user/${entityName}`)
      }
    } catch (error) {
      window.alert(error.response.data.message)
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!contact) return <p>{entityName} not found</p>;

  return (
    <>
    {!update && 
      <>
         <div>
            <h1 className="text-2xl font-bold">{contact.name}</h1>
            <p>GSTIN: {contact.gstin}</p>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <h2 className="text-xl mt-4">Address:</h2>
            <p>{contact.address?.street}, {contact.address?.area}</p>
            <p>{contact.address?.city}, {contact.address?.country} - {contact.address?.pincode}</p>
        </div>
        <button className="cursor-pointer" onClick={() => setUpdate(!update)}>update</button>
        <button className="cursor-pointer" onClick={() => navigate(`/user/${btnAction}`, {state: {contact}})}>create {btnAction}</button>
        <button className="cursor-pointer" onClick={deleteContact}>delete</button>
     </>
    }
   
    {
      update &&
      <form onSubmit={(e) => upDateContact(e)}>
          {Object.keys(newDetails).map( (key, index) => (
            <input key={index} type="text" name={key} value={newDetails[key]} onChange={handleDetails}/>
          ))}
          <h4>address</h4>
          {Object.keys(newAddress).map( (key, index) => (
            <input key={index} type="text" name={key} value={newAddress[key]} onChange={handleAddress}/>
          ))}
          <br />
          <button>Update</button>
      </form>
    }
    </>
  );
};

export default ContactProfile;
