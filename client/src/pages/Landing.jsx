import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    };
    return (
        <header className="w-[100%] flex justify-between items-center py-5 px-10 text-xl text-white bg-black">
            <h1 className="text-3xl">TinyDesk</h1>
            <nav className="flex gap-[10px]">
                <a
                    className="hover:text-moneygreen duration-300 delay-50 cursor-pointer"
                    to="#home"
                >
                    Home
                </a>
                <a
                    className="hover:text-moneygreen duration-300 delay-50 cursor-pointer"
                    to="#about"
                >
                    About
                </a>
                <a
                    className="hover:text-moneygreen duration-300 delay-50 cursor-pointer"
                    to="#contact"
                >
                    Contact Us
                </a>
                <br />
                <button
                    onClick={handleClick}
                    className="bg-black text-center text-white hover:text-moneygreen duration-300 delay-50 px-3"
                >
                    Login
                </button>
            </nav>
        </header>
    );
}

export default Landing;
