import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaFileInvoiceSolid as Invoice } from "react-icons/lia";
import { MdOutlineInventory as Po } from "react-icons/md";
import { MdOutlineContacts as Contact } from "react-icons/md";
import { IoStatsChartSharp as Charts } from "react-icons/io5";

import chart from "/chart.png";
import rupee from "/rupee.png";
import dollar from "/dollar-coins.png";
import aboutUs from "/about-us.jpg";

function Landing() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    };
    return (
        <div id="home" className="min-h-screen flex flex-col items-center">
            <header className="w-full flex justify-between items-center h-[80px] px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 text-xs sm:text-sm md:text-base lg:text-lg text-white bg-black">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-montserrat">
                    tinyDesk
                </h1>
                <nav className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-10">
                    <a
                        className="link-hover-effect cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg"
                        href="#home"
                    >
                        Home
                    </a>
                    <a
                        className="link-hover-effect cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg"
                        href="#aboutUs"
                    >
                        About
                    </a>
                    <a
                        className="link-hover-effect cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg"
                        href="#features"
                    >
                        Features
                    </a>
                    <button
                        onClick={handleClick}
                        className="bg-black text-white link-hover-effect px-1 sm:px-2 md:px-3 lg:px-4 text-xs sm:text-sm md:text-base lg:text-lg"
                    >
                        Login
                    </button>
                </nav>
            </header>

            <main className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 md:py-8 lg:py-10 xl:py-12 flex-grow bg-white w-full flex justify-center">
                <div className="w-full max-w-[1550px]">
                    {/* Hero Section */}
                    <div className="flex flex-col xl:flex-row justify-between items-center gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-35">
                        <div className="gap-2 sm:gap-3 md:gap-4 lg:gap-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl flex flex-col font-bold text-center xl:text-left">
                            <h1>
                                <span className="text-moneygreen">
                                    Bussiness
                                </span>{" "}
                                Done
                            </h1>
                            <h1>smoothly</h1>
                        </div>
                        <div className="p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl bg-black relative w-full max-w-[600px]">
                            <img
                                className="w-full h-[180px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] object-contain"
                                src={chart}
                                alt="Business chart"
                            />
                            <img
                                src={rupee}
                                className="w-[35px] sm:w-[40px] md:w-[50px] lg:w-[65px] xl:w-[80px] absolute top-[-8px] sm:top-[-10px] md:top-[-12px] lg:top-[-15px] right-[8px] sm:right-[10px] md:right-[12px] lg:right-[15px]"
                                alt="Rupee symbol"
                            />
                            <img
                                src={dollar}
                                className="w-[35px] sm:w-[40px] md:w-[50px] lg:w-[65px] xl:w-[80px] absolute bottom-[-6px] sm:bottom-[-8px] md:bottom-[-10px] lg:bottom-[-10px] left-[8px] sm:left-[10px] md:left-[12px] lg:left-[15px]"
                                alt="Dollar coins"
                            />
                        </div>
                    </div>

                    {/* About Us Section */}
                    <div
                        id="aboutUs"
                        className="flex flex-col xl:flex-row justify-between items-center gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-35 mt-10 sm:mt-12 md:mt-16 lg:mt-20"
                    >
                        <div className="p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-black rounded-xl w-full max-w-[600px]">
                            <img
                                src={aboutUs}
                                className="w-full h-[180px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] object-contain"
                                alt="About us"
                            />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-xl text-center xl:text-left font-bold">
                            <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold">
                                <h1>
                                    About{" "}
                                    <span className="text-moneygreen">Us?</span>
                                </h1>
                            </div>
                            <p className="leading-relaxed">
                                <span className="text-moneygreen text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                                    Tiny Desk
                                </span>{" "}
                                is a lightweight, easy-to-use mini ERP solution
                                designed to simplify business operations for
                                small teams and organizations. We streamline
                                essential functions such as raising invoices and
                                purchase orders, generating insightful reports,
                                and maintaining organized records of customers
                                and vendors.
                            </p>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div
                        id="features"
                        className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 px-2"
                    >
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-center xl:text-left">
                            Why <span className="text-moneygreen">Us?</span>
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-center xl:text-left leading-relaxed">
                            <span className="text-moneygreen text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                                Tiny Desk
                            </span>{" "}
                            brings together the key features you need, without
                            unnecessary complexity
                        </p>
                        <div className="mt-5 sm:mt-6 md:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 md:gap-4 lg:gap-6 justify-items-center lg:justify-items-start">
                            <div className="box p-3 sm:p-4 md:p-5 lg:p-6 max-w-[335px] xl:max-w-none">
                                <h1 className="features-header text-sm sm:text-sm md:text-base lg:text-xl xl:text-2xl mb-2 sm:mb-2 md:mb-3 lg:mb-4">
                                    <Invoice className="text-base sm:text-base md:text-lg lg:text-2xl xl:text-3xl" />{" "}
                                    Invoice
                                </h1>
                                <p className="text-center mb-4 text-xs sm:text-xs md:text-sm lg:text-base leading-relaxed">
                                    Easily generate and manage invoices with tax
                                    calculations and customer details. Keep
                                    track of payment status and history in one
                                    place.
                                </p>
                            </div>
                            <div className="box p-3 sm:p-4 md:p-5 lg:p-6 max-w-[335px] xl:max-w-none">
                                <h1 className="features-header text-sm sm:text-sm md:text-base lg:text-xl xl:text-2xl mb-2 sm:mb-2 md:mb-3 lg:mb-4">
                                    <Po className="text-base sm:text-base md:text-lg lg:text-2xl xl:text-3xl" />{" "}
                                    Purchase Order
                                </h1>
                                <p className="text-center mb-4 text-xs sm:text-xs md:text-sm lg:text-base leading-relaxed">
                                    Create, send, and track purchase orders to
                                    vendors with ease. Stay on top of your
                                    inventory by maintaining clear and
                                    consistent order records.
                                </p>
                            </div>
                            <div className="box p-3 sm:p-4 md:p-5 lg:p-6 max-w-[335px] xl:max-w-none">
                                <h1 className="features-header text-sm sm:text-sm md:text-base lg:text-xl xl:text-2xl mb-2 sm:mb-2 md:mb-3 lg:mb-4">
                                    <Contact className="text-base sm:text-base md:text-lg lg:text-2xl xl:text-3xl" />{" "}
                                    Business Contacts
                                </h1>
                                <p className="text-center mb-4 text-xs sm:text-xs md:text-sm lg:text-base leading-relaxed">
                                    Maintain organized records of customers and
                                    vendors, transaction history, and quick
                                    access for invoicing or communication.
                                </p>
                            </div>
                            <div className="box p-3 sm:p-4 md:p-5 lg:p-6 max-w-[335px] xl:max-w-none">
                                <h1 className="features-header text-sm sm:text-sm md:text-base lg:text-xl xl:text-2xl mb-2 sm:mb-2 md:mb-3 lg:mb-4">
                                    <Charts className="text-base sm:text-base md:text-lg lg:text-2xl xl:text-3xl" />{" "}
                                    Financial Overview
                                </h1>
                                <p className="text-center mb-4 text-xs sm:text-xs md:text-sm lg:text-base leading-relaxed">
                                    Get a clear snapshot of your business
                                    finances with real-time summaries of income,
                                    expenses, and overall cash flow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full bg-black py-3 sm:py-4 md:py-5 lg:py-6 px-4 text-xs sm:text-sm md:text-base text-white flex flex-col items-center text-center gap-2">
                <p className="leading-relaxed">
                    You&apos;ve hit rock bottom — but hey, it&apos;s the perfect
                    time to join us! Just look for the login button (top right
                    corner, in case you forgot).
                </p>
                <p>
                    <span className="text-moneygreen">&copy;</span> All Rights
                    reserved
                </p>
            </footer>
        </div>
    );
}

export default Landing;
