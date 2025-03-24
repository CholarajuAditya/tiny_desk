import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Login(){
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    function handleChange(e){
        const {name,value} = e.target
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))    
    }

    async function logIn(e){
        try {
            e.preventDefault()
            const response = await axios.post("/api/login", loginData, {responseType: "json"} )
            localStorage.setItem("token", response.data.token)
            if(response.status === 200){
                window.alert(response.data.message)
                navigate("/user")
            }
        } catch (err) {
            if(err.response && err.response.status === 401){
                window.alert(err.response.data.message)
            }
            else{
                window.alert(err.message)
            }
        }
        
    }

    return( 
        <div className="text-white bg-gray-900 flex justify-center items-center h-screen w-screen">
            <form  method="get" onSubmit={logIn} className="flex flex-col items-center justify-center h-[450px] rounded-xl bg-gray-800 p-16">
                <h1 className="text-4xl mb-6">Log In</h1>
                <hr className="border-1 border-gray-400 w-80 mb-8"/>
                <label className="mb-6 relative flex items-center">
                    <input type="text" className="peer form-input"  name="email" onChange={handleChange} value={loginData.email} required/>
                    <span className="form-input-label ">Email</span>
                </label>
                <label className="mb-6  relative flex items-center">
                    <input type="password" className="peer form-input"  name="password" onChange={handleChange}  value={loginData.password} required/>
                    <span className="form-input-label">Password</span>
                </label>
                <button className="form-button">Login</button>
                <div className="mt-6">Don&#39;t have an account yet? <Link to="/register" className="underline-effect text-moneygreen">Register Here</Link></div>
            </form>
        </div>
    )
}

export default Login