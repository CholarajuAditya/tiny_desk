import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiCustomerService2Line, RiShoppingCart2Line } from "react-icons/ri";
import { TbInvoice, TbReportSearch } from "react-icons/tb";
import { IoReceiptOutline } from "react-icons/io5";

const navLinks = [
  { to: "dashboard", icon: <BiHomeAlt2 />, label: "Dashboard" },
  { to: "customer", icon: <RiCustomerService2Line />, label: "Customers" },
  { to: "vendor", icon: <RiShoppingCart2Line />, label: "Vendors" },
  { to: "invoice", icon: <TbInvoice />, label: "Invoice" },
  { to: "po", icon: <IoReceiptOutline />, label: "PO" },
  { to: "report", icon: <TbReportSearch />, label: "Reports" },
];

const Sidebar = ({ logout }) => (
  <div className="flex flex-col items-center bg-black max-w-60 px-10 py-10 justify-between">
    <h1 className="text-white text-2xl">tiny desk</h1>
    <div className="flex flex-col">
      {navLinks.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `nav-link ${isActive ? "opacity-100 text-green-300" : ""}`
          }
        >
          {icon} {label}
        </NavLink>
      ))}
    </div>
    <button onClick={logout} className="btn w-[90%]">
      Logout
    </button>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Unauthorized access. Try logging in again.");
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    navigate("/");
  };

  return (
    <div className="flex w-full">
      <Sidebar logout={logout} />
      <div className="h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
