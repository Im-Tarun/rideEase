import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {
  const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
  

  return (
    <>
    <UserDataContext.Provider value={[userData, setUserData, isLoading, setIsLoading]}>
      {children}
    </UserDataContext.Provider>
    </>
  )
}

export default UserContext
