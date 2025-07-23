import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function logIn(e) {
        e.preventDefault();

        try {
            // Use global backend URL here
            setLoading(true);
            const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

            const response = await axios.post(
                `${API_BASE_URL}/api/login`,
                loginData,
                {
                    responseType: "json",
                }
            );

            localStorage.setItem("token", response.data.token);

            if (response.status === 200) {
                window.alert(response.data.message);
                navigate("/user");
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                window.alert(err.response.data.message);
            } else {
                window.alert(err.message);
            }
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
                    onSubmit={logIn}
                    className="bg-[radial-gradient(ellipse_at_top,_#1f2937,_#111827)] shadow-2xl rounded-xl 
                            px-6 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 lg:px-12 lg:py-4
                            flex flex-col items-center justify-around 
                            w-full max-w-[320px] sm:max-w-[350px] md:max-w-[420px] 
                            min-h-[450px] sm:min-h-[480px] md:min-h-[500px]"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl mb-4 sm:mb-5 md:mb-6 text-moneygreen font-medium text-center">
                        Log In
                    </h1>

                    <div className="flex flex-col gap-6 sm:gap-8 md:gap-9 w-full">
                        <input
                            type="text"
                            className="form-input"
                            name="email"
                            onChange={handleChange}
                            value={loginData.email}
                            required
                            placeholder="Email/Username"
                        />
                        <input
                            type="password"
                            className="form-input"
                            name="password"
                            onChange={handleChange}
                            value={loginData.password}
                            required
                            placeholder="Password"
                        />
                    </div>

                    <button className="form-button">Login</button>

                    <div className="mt-3 text-center text-sm sm:text-base px-2">
                        Don&#39;t have an account yet?{" "}
                        <Link
                            to="/register"
                            className="text-moneygreen block sm:inline mt-1 sm:mt-0"
                        >
                            Register Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
