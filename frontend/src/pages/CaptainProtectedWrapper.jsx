import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../contexts/CaptainContext.jsx'
import axios from 'axios'

const CaptainProtectedWrapper = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [captainData, setCaptainData, isLoading, setIsLoading] = useContext(CaptainDataContext)

    
    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
        fetchUserProfile()
    }, [])

    
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/captain/profile`, {
                headers: {
                    authorization: "Bearer " + token
                }
            })
            if (response.status === 200) {
                setCaptainData(response.data)
                setIsLoading(false)
            }

        } catch (error) {
            console.error('Registration failed:', error);
            localStorage.removeItem('token')
            navigate('/captain-login')
        }
    }


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

export default CaptainProtectedWrapper


