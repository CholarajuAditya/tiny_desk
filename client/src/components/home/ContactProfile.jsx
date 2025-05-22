import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DocumentList from "./DocumentList.jsx";

const ContactProfile = ({ url, entityName, btnAction }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState();
    const [list, setList] = useState();
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [newDetails, setNewDetails] = useState({
        name: "",
        gstin: "",
        phone: "",
        email: "",
    });
    const [newAddress, setNewAddress] = useState({
        street: "",
        area: "",
        city: "",
        country: "",
        pincode: "",
    });
    useEffect(() => {
        const fetchContact = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${url}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);

                setContact(response.data.contact);
                setList(response.data.list);
                const { name, gstin, phone, email, address } =
                    response.data.contact;
                setNewDetails((prev) => ({
                    ...prev,
                    name,
                    gstin,
                    phone,
                    email,
                }));
                setNewAddress((prev) => ({
                    ...prev,
                    ...address,
                }));
            } catch (error) {
                console.error(
                    `Error fetching ${entityName}:`,
                    error.response?.data?.message || error.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [id, entityName, url]);

    const handleDetails = async (e) => {
        const { name, value } = e.target;
        setNewDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddress = async (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const upDateContact = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const data = { ...newDetails, address: { ...newAddress } };
            const response = await axios.patch(`${url}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setContact(response.data);
                window.alert(`${entityName} updated successfully`);
            }
        } catch (error) {
            window.alert(error.response.data.message);
        } finally {
            setUpdate(false);
        }
    };

    const deleteContact = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                window.alert(`${entityName} deleted successfully`);
                navigate(`/user/${entityName}`);
            }
        } catch (error) {
            window.alert(error.response.data.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!contact) return <p>{entityName} not found</p>;

    return (
        <>
            <div className="min-h-screen w-full flex flex-col items-center">
                {!update && (
                    <>
                        <div className="w-[100%] h-[100%] mx-auto px-30 pb-15 rounded-lg">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {contact.name}
                                </h1>
                                <p className="text-gray-600">
                                    <span className="font-semibold">
                                        GSTIN:
                                    </span>{" "}
                                    {contact.gstin}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">
                                        Phone:
                                    </span>{" "}
                                    {contact.phone}
                                </p>
                                <p className="text-gray-600 truncate w-full">
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {contact.email}
                                </p>

                                <h2 className="text-xl font-semibold mt-4 text-gray-900">
                                    Address:
                                </h2>
                                <p className="text-gray-600">
                                    {contact.address?.street},{" "}
                                    {contact.address?.area}
                                </p>
                                <p className="text-gray-600">
                                    {contact.address?.city},{" "}
                                    {contact.address?.country} -{" "}
                                    {contact.address?.pincode}
                                </p>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                    onClick={() => setUpdate(!update)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                                    onClick={() =>
                                        navigate(`/user/${btnAction}`, {
                                            state: { contact },
                                        })
                                    }
                                >
                                    Create {btnAction}
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                    onClick={deleteContact}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <DocumentList list={list} type={btnAction} />
                    </>
                )}

                {update && (
                    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Update Contact
                        </h2>
                        <form
                            onSubmit={(e) => upDateContact(e)}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {Object.keys(newDetails).map((key, index) => (
                                    <label key={index} className="block">
                                        <span className="text-sm font-medium text-gray-700">
                                            {key}:
                                        </span>
                                        <input
                                            type="text"
                                            name={key}
                                            value={newDetails[key]}
                                            onChange={handleDetails}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                        />
                                    </label>
                                ))}
                            </div>

                            <h4 className="text-lg font-semibold text-gray-900 mt-4">
                                Address
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.keys(newAddress).map((key, index) => (
                                    <label key={index} className="block">
                                        <span className="text-sm font-medium text-gray-700">
                                            {key}:
                                        </span>
                                        <input
                                            type="text"
                                            name={key}
                                            value={newAddress[key]}
                                            onChange={handleAddress}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                        />
                                    </label>
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 mt-4"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default ContactProfile;
