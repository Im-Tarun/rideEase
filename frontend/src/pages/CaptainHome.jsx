import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import NewRidePannel from '../components/captainComponents/NewRidePannel';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CaptainDetails from '../components/captainComponents/CaptainDetails';
import ConfirmRidePnl from '../components/captainComponents/ConfirmRidePnl';
import PickUpPannel from '../components/captainComponents/PickUpPannel';
import {CaptainDataContext} from '../contexts/CaptainContext'
import { SocketContext } from '../contexts/SocketContext';
import axios from 'axios'; 

const CaptainHome = () => {
  const [showNewRidePnl, setShowNewRidePnl] = useState(false)
  const [showCnfRidePnl , setShowCnfRidePnl ] = useState(false)
  const [showPickUpPnl , setShowPickUpPnl ] = useState(false)
  const [newRide , setNewRide ] = useState(null)
  const [isRiding , setIsRiding ] = useState(false)

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

  // socket logic 
  const [captainData] = useContext(CaptainDataContext); 
  const {socket} = useContext(SocketContext)

  
  useEffect(() => {
    socket.emit("join",{userType: 'captain', userId : captainData._id})

    const updateLocation = () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // socket.emit("updateCapLoc", { capId: captainData._id, latitude, longitude }); //because google not able to find my correct location
          socket.emit("updateCapLoc", { capId: captainData._id, latitude: 26.8336077, longitude: 81.03627879999999});
          console.log("Location Updated:", latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    };
    updateLocation()
    
    if(!isRiding){
      socket.on("new-ride", (data) => {
        setNewRide(data);
        setShowNewRidePnl(true);
      });
    }

    // const intervalId = setInterval(updateLocation, 1000)  // Set up the interval
    // return () => clearInterval(intervalId); //cleanup
  }, [socket])
  
  const acceptRide = async() => {
    setIsRiding(true);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/ride/confirm`, {
      rideId: newRide._id
    }, { // Configuration object
      headers: {
        authorization: "Bearer " + localStorage.getItem('token'),
      },
    }
  )
    console.log(response.data)
    setShowPickUpPnl(true)
    setShowNewRidePnl(false)
  }
  
 
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
          <NewRidePannel acceptRide={acceptRide} newRide={newRide} setShowNewRidePnl={setShowNewRidePnl} setShowPickUpPnl={setShowPickUpPnl} />
        </div>

        {/* pikup ride */}
        <div ref={pickUpPnlRef} className='w-full flex flex-col justify-end z-40 translate-y-full absolute '>
          <PickUpPannel setShowPickUpPnl={setShowPickUpPnl} newRide={newRide} setShowCnfRidePnl={setShowCnfRidePnl} />
        </div>

        {/* confirm  ride  */}
        <div ref={confirmRidePnlRef} className='w-full h-screen flex flex-col justify-end z-40 translate-y-full absolute '>
          <ConfirmRidePnl  newRide={newRide}  setShowCnfRidePnl={setShowCnfRidePnl}/>
        </div>


      </div>
    </div>

  )
}


export default CaptainHome
