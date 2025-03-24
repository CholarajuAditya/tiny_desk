import { useEffect, useState } from 'react'
import {NavLink} from "react-router-dom"
import axios from "axios"

const Dashboard = () => {
    const [monthlyReport, setMonthlyReport] = useState({})

    useEffect(() => {
        const getMonthlyReport = async() => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get("/api/report", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    setMonthlyReport(response.data)
                    console.log(response.data);
                    
                }
            } catch (error) {
                window.alert(error.response.data.message)
            }
        }

        getMonthlyReport()
    }, [])
    
    return (
        <>    
            <div>Dashboard</div>
            <NavLink className="mx-20" to="/user/profile">profile</NavLink>   
            {
                monthlyReport && Object.keys(monthlyReport).length > 0 ? (
                    Object.keys(monthlyReport).map((key, index) => (
                        <p key={index}>{key}: {monthlyReport[key]}</p>
                    ))
                ) : (
                    <p>Loading report...</p>
                )
            }
        </>
    )
}

export default Dashboard