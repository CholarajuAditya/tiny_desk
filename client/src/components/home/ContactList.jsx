import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Loading from './Loading.jsx';
import { NavLink } from 'react-router-dom';

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
        <>
          <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${entityName}s...`} />
          <button onClick={() => setCreateNew((prev) => !prev)} className="cursor-pointer hover:bg-black hover:text-white">
            Create New {entityName}
          </button>
          <form className={createNew ? 'block' : 'hidden'} onSubmit={createContact}>
            {Object.keys(newContactData).map((field, index) => (
              <label className="block" key={index} htmlFor={field}>
                {field}: <input required type="text" name={field} value={newContactData[field]} onChange={handleContactData} />
              </label>
            ))}
            {Object.keys(newContactAddress).map((field, index) => (
              <label className="block" key={index} htmlFor={field}>
                {field}: <input  required type="text" name={field} value={newContactAddress[field]} onChange={handleContactAddress} />
              </label>
            ))}
            <button className="cursor-pointer hover:bg-black hover:text-white">Submit</button>
          </form>
          <div className="grid grid-cols-4">
            {filteredContactList.map((contact, index) => (
              <NavLink key={index} to={`/user/${entityName}/${contact._id}`}>
                <div className="border-1 w-[200px]">
                  <h1 className="text-2xl font-bold">{contact.name}</h1>
                  <p>{contact.gstin}</p>
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ContactList;
