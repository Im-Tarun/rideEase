import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
  const [captainData, setCaptainData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
    <CaptainDataContext.Provider value={[captainData, setCaptainData, isLoading, setIsLoading]}>
      {children}
    </CaptainDataContext.Provider>
    </>
  )
}

export default CaptainContext
