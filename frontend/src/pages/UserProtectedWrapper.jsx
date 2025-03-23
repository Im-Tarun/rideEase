import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserContext'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [userData, setUserData, isLoading, setIsLoading] = useContext(UserDataContext)

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        headers: {
          authorization: "Bearer " + token
        }
      })
      if (response.status === 200) {
        setUserData(response.data)
        setIsLoading(false)
      }

    } catch (error) {
      console.error('Registration failed:', error);
      localStorage.removeItem('token')
      navigate('/user-login')
    }  
  }

  useEffect(() => {
    if (!token) {
      navigate('/user-login')
    }
    fetchUserProfile()
  }, [token, navigate, setUserData, setIsLoading])




  if (isLoading) {
    // Show a loading indicator or nothing while checking the token
    return <div className='text-center text-6xl my-auto w-screen text-white h-screen flex items-center justify-center'>Loading...</div>
  }

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
