import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import NewRidePannel from '../components/captainComponents/NewRidePannel';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CaptainDetails from '../components/captainComponents/CaptainDetails';
import ConfirmRidePnl from '../components/captainComponents/ConfirmRidePnl';
import PickUpPannel from '../components/captainComponents/PickUpPannel';
import {CaptainDataContext} from '../contexts/CaptainContext'

const CaptainHome = () => {
  const [showNewRidePnl, setShowNewRidePnl] = useState(true)
  const [showCnfRidePnl , setShowCnfRidePnl ] = useState(false)
  const [showPickUpPnl , setShowPickUpPnl ] = useState(false)

  const newRidePnlRef = useRef(null)
  const confirmRidePnlRef = useRef(null)
  const pickUpPnlRef = useRef(null)

  //new ride 
  useGSAP(() => {
    if (showNewRidePnl) {
      gsap.to(newRidePnlRef.current, {
        translateY: "0%",
      })
    } else {
      gsap.to(newRidePnlRef.current, {
        translateY: "100%",
      })
    }
  }, [showNewRidePnl])

  //pick up ride 
  useGSAP(() => {
    if (showPickUpPnl) {
      gsap.to(pickUpPnlRef.current, {
        translateY: "0%",
      })
    } else {
      gsap.to(pickUpPnlRef.current, {
        translateY: "100%",
      })
    }
  }, [showPickUpPnl])

  //confirm ride 
  useGSAP(() => {
    if (showCnfRidePnl) {
      gsap.to(confirmRidePnlRef.current, {
        translateY: "0%",
      })
    } else {
      gsap.to(confirmRidePnlRef.current, {
        translateY: "100%",
      })
    }
  }, [showCnfRidePnl])

  const [captainData] = useContext(CaptainDataContext); 


  return (

    <div className='flex relative  flex-col bg-cover bg-center bg-[url(https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif)] h-screen justify-between '>

      <div className='absolute flex z-10  items-center justify-between top-0 w-full'>
        <img width={120} className='h-fit m-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="UBER" />
        <Link to={'/captain-logout'} className='text-4xl bg-[#F1F2F6] p-2 rounded-full mx-3 font-extrabold' ><IoIosLogOut /></Link>
      </div>

      <div className=' w-full h-screen absolute top-0 flex flex-col justify-end overflow-hidden'>
        {/* captain details */}
        <div className='bg-[#F1F2F6] px-3 flex flex-col'>
          <CaptainDetails captainData={captainData} />
        </div>

        {/* show new ride  */}
        <div ref={newRidePnlRef} className='w-full flex flex-col justify-end z-40 translate-y-full absolute '>
          <NewRidePannel setShowNewRidePnl={setShowNewRidePnl} setShowPickUpPnl={setShowPickUpPnl} />
        </div>

        {/* pikup ride */}
        <div ref={pickUpPnlRef} className='w-full flex flex-col justify-end z-40 translate-y-full absolute '>
          <PickUpPannel setShowPickUpPnl={setShowPickUpPnl} setShowCnfRidePnl={setShowCnfRidePnl} />
        </div>

        {/* confirm  ride  */}
        <div ref={confirmRidePnlRef} className='w-full h-screen flex flex-col justify-end z-40 translate-y-full absolute '>
          <ConfirmRidePnl setShowCnfRidePnl={setShowCnfRidePnl}/>
        </div>


      </div>
    </div>

  )
}


export default CaptainHome
