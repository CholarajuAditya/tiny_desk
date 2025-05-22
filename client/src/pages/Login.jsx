import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
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
        }
    }

    return (
        <div className="bg-grid text-white text-[18px] bg-gray-100 flex justify-center items-center h-screen w-screen">
            <form
                method="get"
                onSubmit={logIn}
                className="bg-[radial-gradient(ellipse_at_top,_#1f2937,_#111827)] shadow-2xl rounded-xl px-16 py-4 flex flex-col items-center justify-around h-[500px]"
            >
                <h1 className="text-5xl mb-6 text-moneygreen font-medium">
                    Log In
                </h1>
                <div className="flex flex-col gap-11">
                    <input
                        type="text"
                        className="form-input"
                        name="email"
                        onChange={handleChange}
                        value={loginData.email}
                        required
                        placeholder="Email"
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
                <div className="mt-3">
                    Don&#39;t have an account yet?{" "}
                    <Link
                        to="/register"
                        className="underline-effect text-moneygreen"
                    >
                        Register Here
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
