import { useState } from "react";
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
        try {
            e.preventDefault();
            const { password, password2 } = loginData;

            if (password !== password2)
                throw new Error("password does'nt match");

            const response = await axios.post("/api/register", loginData, {
                responseType: "json",
            });

            if (response.status === 200) {
                window.alert("Registration successful");
                navigate("/login");
            }
        } catch (error) {
            window.alert(error.message);
        }
    }

    return (
        <div className="text-white text-[18px] bg-gray-300 flex justify-center items-center h-screen w-screen">
            <div className="flex w-[60%] h-[60%]">
                <form
                    method="get"
                    onSubmit={RegisterUser}
                    className="flex flex-col items-center justify-around h-full bg-black px-16 py-10"
                >
                    <h1 className="text-5xl mb-6">Register</h1>
                    {Object.keys(loginData).map((key, index) => (
                        <label
                            key={index}
                            className="mb-6 relative flex items-center"
                        >
                            <input
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
                            />
                            <span className="form-input-label">
                                {key === "password2"
                                    ? "Confirm Password"
                                    : key.charAt(0).toUpperCase() +
                                      key.slice(1)}
                            </span>
                        </label>
                    ))}
                    <button className="form-button">Register</button>
                </form>
                <div className="bg-black w-full flex flex-col py-[100px] px-[60px]">
                    <h1 className="text-5xl text-moneygreen my-10">Join Us!</h1>
                    <p className="text-2xl">
                        Focus on what matters — we’ll handle the heavy lifting.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
