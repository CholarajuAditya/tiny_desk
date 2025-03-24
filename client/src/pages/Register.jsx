import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register(){
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        password2: "",
    })

    function handleChange(e){
        const {name,value} = e.target
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))    
    }

    async function RegisterUser(e){
        try {
            e.preventDefault()
            const { password, password2 } = loginData

            if(password !== password2)
                throw new Error("password does'nt match");
                
            const response = await axios.post("/api/register", loginData, {responseType: "json"})
            
            if(response.status === 200){
                window.alert("Registration successful")
                navigate("/login")
            }
        } catch (error) {
            window.alert(error.message)  
        }
    }

    return( 
        <div className="text-white bg-gray-900 flex justify-center items-center h-screen w-screen">
            <form  method="get" onSubmit={RegisterUser} className="flex flex-col items-center justify-center h-[450px] rounded-xl bg-gray-800 p-16">
                <h1 className="text-4xl mb-6">Register</h1>
                <hr className="border-1 border-gray-400 w-80 mb-8"/>
                { Object.keys(loginData).map( (key, index) => (
                    <label key={index} className="mb-6 relative flex items-center">
                        <input type={key === "password" || key === "password2" ? "password": "text"} className="peer form-input"  name={key} onChange={handleChange} value={loginData[key]} required/>
                        <span className="form-input-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </label>
                )) }
                <button className="form-button">Register</button>
            </form>
        </div>
    )
}

export default Register