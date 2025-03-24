import { useNavigate } from "react-router-dom"

function Landing(){
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/login")
    }
    return(
        <nav className="text-black">
            <a to="#home">Home</a>
            <a to="#about">About</a>
            <a to="#contact">Contact Us</a>
            <br />
            <button onClick={handleClick} className="bg-black text-white">Login</button>
        </nav>
    )
}

export default Landing