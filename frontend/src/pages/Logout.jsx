import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
      logoutUser()
    }, [])
    
    const logoutUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/api/user/logout`, {
          headers: {
            authorization: "Bearer " + token,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/user-login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    
  return (
    <>loding...</>
  )
}

export default Logout
