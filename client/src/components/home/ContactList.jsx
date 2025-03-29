import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Loading from './Loading.jsx';
import { NavLink } from 'react-router-dom';
import { BiAddToQueue, BiX  } from "react-icons/bi";

const ContactList = ({ url, entityName }) => {
  const [loading, setLoading] = useState(true);
  const [contactList, setContactList] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [newContactData, setNewContactData] = useState({
    name: '',
    gstin: '',
    phone: '',
    email: ''
  });
  const [newContactAddress, setNewContactAddress] = useState({
    street: '',
    area: '',
    city: '',
    country: '',
    pincode: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getList = async () => {
      try {
        const list = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (list.status === 200) {
          setContactList(list.data);
        }
      } catch (error) {
        window.alert(error.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    getList();
  }, [url]);

  const [query, setQuery] = useState('');

  const createContact = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = { ...newContactData, address: newContactAddress };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setContactList((prev) => [...prev, response.data]);
        window.alert(`${entityName} created successfully`);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || `Error creating ${entityName}`);
    }
  };

  const handleContactData = (e) => {
    const { name, value } = e.target;
    setNewContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactAddress = (e) => {
    const { name, value } = e.target;
    setNewContactAddress((prev) => ({ ...prev, [name]: value }));
  };

  const filteredContactList = useMemo(
    () => contactList.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase())),
    [contactList, query]
  );

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="flex flex-col items-center max-w-6xl mx-auto p-6">

          <div className="flex align-center min-w-[300px] w-[50%] items-center justify-between">
            <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${entityName}s...`}
              className="bg-white w-full  p-2 text-xl border border-gray-300 rounded-[30px] pl-6 outline-none" />
            <button 
              onClick={() => setCreateNew((prev) => !prev)} 
              className="w-[50px] h-[40px] ml-5 flex items-center justify-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
              {createNew ? <BiX size={26}/> : <BiAddToQueue size={24}/>}
            </button>
          </div>

          <form className={`mt-6 p-8 bg-gray-50 rounded-lg shadow-md ${createNew ? "block" : "hidden"}`} onSubmit={createContact}>
            <h2 className="text-2xl text-center font-semibold mb-4">New {entityName}</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(newContactData).map((field, index) => (
                <label className="block text-md font-medium" key={index} htmlFor={field}>
                  {field}:
                  <input required type="text" name={field} value={newContactData[field]} onChange={handleContactData} 
                    className="text-md mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                </label>
              ))}
              {Object.keys(newContactAddress).map((field, index) => (
                <label className="block text-sm font-medium" key={index} htmlFor={field}>
                  {field}:
                  <input required type="text" name={field} value={newContactAddress[field]} onChange={handleContactAddress} 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                </label>
              ))}
            </div>
            <button type="submit" 
              className="w-full mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200">
              Submit
            </button>
          </form>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-20">
            {filteredContactList.map((contact, index) => (
              <NavLink key={index} to={`/user/${entityName}/${contact._id}`} className="block">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl shadow-gray-400 transition duration-200">
                  <h1 className="text-lg font-semibold text-gray-800">{contact.name}</h1>
                  <p className="text-gray-600 truncate">GSTIN: {contact.gstin}</p>
                  <p className="text-gray-600 truncate">phone: {contact.phone}</p>
                  <p className="text-gray-600 truncate">{contact.email}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
  </>
  );
};

export default ContactList;
