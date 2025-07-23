import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "./";
import { BiEditAlt } from "react-icons/bi";
import { Regex } from "../../Regex.js";

const UserDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [profileCreated, setProfileCreated] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "",
        gstin: "",
        phone: "",
    });
    const [addressData, setAddressData] = useState({
        street: "",
        area: "",
        city: "",
        country: "",
        pincode: "",
    });
    const [monthlyReport, setMonthlyReport] = useState({});
    const [editMode, setEditMode] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";
    const token = localStorage.getItem("token");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const profileRes = await axios.get(`${API_BASE_URL}/api/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const { name, gstin, phone, address } = profileRes.data;
            setProfileData({ name, gstin, phone });
            setAddressData({ ...address });
            setProfileCreated(true);

            const reportRes = await axios.get(`${API_BASE_URL}/api/report`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMonthlyReport(reportRes.data);
        } catch (err) {
            console.error(err);
            setProfileCreated(false); // assume profile doesn't exist on error
        } finally {
            setLoading(false);
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: name === "gstin" ? value.toUpperCase() : value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData((prev) => ({ ...prev, [name]: value }));
    };

    const validateFields = () => {
        const validation_fields = {
            GSTIN: profileData.gstin,
            phone: profileData.phone,
            pincode: addressData.pincode,
        };

        for (const [key, val] of Object.entries(validation_fields)) {
            if (!Regex[key].test(val)) {
                window.alert(`Please enter a valid ${key}`);
                return false;
            }
        }

        return true;
    };

    const createProfile = async (data) => {
        return await axios.post(`${API_BASE_URL}/api/profile`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    };

    const updateProfile = async (data) => {
        return await axios.patch(`${API_BASE_URL}/api/profile`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    };

    const createOrUpdateProfile = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        const data = {
            ...profileData,
            gstin: profileData.gstin.toUpperCase(),
            address: addressData,
        };

        try {
            const response = profileCreated
                ? await updateProfile(data)
                : await createProfile(data);

            const successMsg =
                response.data?.message ||
                (profileCreated ? "Profile updated" : "Profile created");

            window.alert(successMsg);
            setProfileCreated(true);
            setEditMode(false);
            await getData();
        } catch (err) {
            console.error(err);
            window.alert(
                err.response?.data?.message || "Profile update failed"
            );
        }
    };

    return (
        <div className="flex flex-col items-center max-w-6xl mx-auto p-6 min-h-screen">
            {loading && <Loading />}

            {!loading && (
                <>
                    {/* Top Action Bar */}
                    <div className="flex justify-between items-center w-full mb-10">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Dashboard
                        </h1>
                        {profileCreated && (
                            <button
                                onClick={() => setEditMode((prev) => !prev)}
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                <BiEditAlt className="mr-2" />{" "}
                                {editMode ? "Cancel" : "Edit Profile"}
                            </button>
                        )}
                    </div>

                    {/* Monthly Report Section */}
                    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Monthly Report
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.keys(monthlyReport).map((key, idx) => (
                                <div
                                    key={idx}
                                    className="text-lg text-gray-700"
                                >
                                    <strong>{key}:</strong> {monthlyReport[key]}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Profile Info or Form */}
                    <div className="w-full bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

                        {editMode || !profileCreated ? (
                            <form onSubmit={createOrUpdateProfile}>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(profileData).map(
                                        ([key, value]) => (
                                            <label
                                                key={key}
                                                className="block text-md font-medium"
                                            >
                                                {key}:
                                                <input
                                                    required
                                                    autoComplete="off"
                                                    name={key}
                                                    type="text"
                                                    value={value}
                                                    onChange={
                                                        handleProfileChange
                                                    }
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                                />
                                            </label>
                                        )
                                    )}
                                    {Object.entries(addressData).map(
                                        ([key, value]) => (
                                            <label
                                                key={key}
                                                className="block text-md font-medium"
                                            >
                                                {key}:
                                                <input
                                                    required
                                                    autoComplete="off"
                                                    name={key}
                                                    type="text"
                                                    value={value}
                                                    onChange={
                                                        handleAddressChange
                                                    }
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                                />
                                            </label>
                                        )
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(profileData).map(
                                    ([key, value], idx) => (
                                        <div
                                            key={idx}
                                            className="text-lg text-gray-800"
                                        >
                                            <strong>
                                                {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                                :
                                            </strong>{" "}
                                            {value}
                                        </div>
                                    )
                                )}
                                {Object.entries(addressData).map(
                                    ([key, value], idx) => (
                                        <div
                                            key={idx}
                                            className="text-lg text-gray-800"
                                        >
                                            <strong>
                                                {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                                :
                                            </strong>{" "}
                                            {value}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDashboard;
