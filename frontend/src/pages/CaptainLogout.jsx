import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate()
    useEffect(() => {
      captainLogout()
    }, [])
    
    const captainLogout = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/captain/logout`, {
          headers: {
            authorization: "Bearer " + token,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    
  return (
    <>loading...</>
  )
}

export default CaptainLogout
