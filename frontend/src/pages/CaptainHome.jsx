import React from 'react'
import { Link } from 'react-router-dom'

const CaptainHome = () => {
  return (
    <>
    <div>
      this is captain home
    </div>
    <Link to={'/captain-logout'}>logout captain</Link>
    </>
  )
}

export default CaptainHome
