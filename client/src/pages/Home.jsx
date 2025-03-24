import { NavLink, Outlet } from "react-router-dom"

const Home = () => {

  return( 
  <>
    <div className="flex gap-20 w-[100%]">
      <div className="side-bar">
        <NavLink className="nav-link" to="dashboard">dashboard</NavLink>
        <NavLink className="nav-link" to="customer">customers</NavLink>
        <NavLink className="nav-link" to="vendor">vendors</NavLink>
        <NavLink className="nav-link" to="invoice">invoice</NavLink>
        <NavLink className="nav-link" to="po">PO</NavLink>
        <NavLink className="nav-link" to="report">reports</NavLink>
      </div>
      <div className="flex justify-center h-screen items-center w-[100%]">
        <Outlet/>
      </div>
    </div>
  </>  
  )
}

export default Home;
