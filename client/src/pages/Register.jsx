import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
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
            setLoading(true);
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
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative">
            {loading && <Loading />}
            <div className="bg-grid text-white text-[18px] bg-gray-100 flex justify-center items-center min-h-screen w-screen p-4 sm:p-6 md:p-8">
                <form
                    method="get"
                    onSubmit={RegisterUser}
                    className="bg-[radial-gradient(ellipse_at_top,_#1f2937,_#111827)] shadow-2xl rounded-xl 
                            px-6 pt-4 pb-6 sm:px-8 sm:pt-6 sm:pb-8 md:px-12 md:pt-8 md:pb-10
                            flex flex-col items-center justify-around 
                            w-full max-w-[320px] sm:max-w-[350px] md:max-w-[420px]
                            min-h-[390px] max-h-[520px] sm:max-h-[550px] md:max-h-[580px] lg:h-[470px]"
                >
                    <h1 className="sm:mb-6 md:mb-10 text-3xl sm:text-4xl md:text-5xl text-moneygreen font-medium text-center">
                        Register
                    </h1>

                    <div className="sm:mb-6 md:mb-10 flex flex-col gap-6 sm:gap-8 md:gap-9 w-full">
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
                                    key === "password2"
                                        ? "Re-enter password"
                                        : key === "email"
                                        ? "Email/Username"
                                        : key
                                }
                            />
                        ))}
                    </div>

                    <button className="form-button">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
