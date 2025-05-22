import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { IoPersonCircleOutline } from "react-icons/io5";

const Dashboard = () => {
    const [monthlyReport, setMonthlyReport] = useState({});

    const getMonthlyReport = async () => {
        try {
            const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_BASE_URL}/api/report`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setMonthlyReport(response.data);
                console.log(response.data);
            }
        } catch (error) {
            window.alert(error.response.data.message);
        }
    };

    useEffect(() => {
        getMonthlyReport();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center relative w-[100%] h-screen">
            <NavLink
                className="text-4xl absolute top-0 right-0 hover:scale-110 duration-300"
                to="/user/profile"
            >
                <IoPersonCircleOutline />
            </NavLink>
            {monthlyReport && Object.keys(monthlyReport).length > 0 ? (
                Object.keys(monthlyReport).map((key, index) => (
                    <p key={index}>
                        {key}: {monthlyReport[key]}
                    </p>
                ))
            ) : (
                <p>Loading report...</p>
            )}
        </div>
    );
};

export default Dashboard;
