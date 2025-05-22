import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        password2: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function RegisterUser(e) {
        e.preventDefault();

        try {
            const { password, password2 } = loginData;

            if (password !== password2) {
                throw new Error("Passwords don't match");
            }

            // Use the global backend URL here
            const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

            const response = await axios.post(
                `${API_BASE_URL}/api/register`,
                loginData,
                {
                    responseType: "json",
                }
            );

            if (response.status === 200) {
                window.alert("Registration successful");
                navigate("/login");
            }
        } catch (error) {
            // Show either error from response or generic message
            window.alert(
                error.response?.data?.message ||
                    error.message ||
                    "Registration failed"
            );
        }
    }

    return (
        <div className="bg-grid text-white text-[18px] bg-gray-100 flex justify-center items-center h-screen w-screen">
            <form
                method="get"
                onSubmit={RegisterUser}
                className="bg-[radial-gradient(ellipse_at_top,_#1f2937,_#111827)] shadow-2xl rounded-xl px-16 py-4 flex flex-col items-center justify-around h-[500px]"
            >
                <h1 className="text-5xl  text-moneygreen font-medium">
                    Register
                </h1>
                <div className="flex flex-col gap-11">
                    {Object.keys(loginData).map((key) => (
                        <input
                            key={key}
                            type={
                                key === "password" || key === "password2"
                                    ? "password"
                                    : "text"
                            }
                            className="peer form-input"
                            name={key}
                            onChange={handleChange}
                            value={loginData[key]}
                            required
                            placeholder={
                                key === "password2" ? "Re-enter Password" : key
                            }
                        />
                    ))}
                </div>
                <button className="form-button">Register</button>
            </form>
        </div>
    );
}

export default Register;
