/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/users/logout", { 
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem("token");
            navigate('/login');
        }

    })
  return (
    <div>
        userlogout
      
    </div>
  )
}

export default UserLogout
