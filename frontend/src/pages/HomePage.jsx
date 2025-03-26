import React, { useRef, useState } from 'react'
import { FaSquare } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { RiArrowDownSLine } from "react-icons/ri";
import LocationSearchPannel from '../components/userComponents/LocationSearchPannel.jsx';
import SelectVehicle from '../components/userComponents/SelectVehicle.jsx';
import FindingDriver from '../components/userComponents/FindingDriver.jsx';
import WaitingForDriver from '../components/userComponents/WaitingForDriver.jsx';
import LocationInputs from '../components/userComponents/LocationInputs.jsx';
import axios from 'axios';


const HomePage = () => {
  const [showLocPannel, setShowLocPannel] = useState(false)
  const [showVehiclePnl, setShowVehiclePnl] = useState(false)
  const [showFindDriverPnl, setShowFDrPnl] = useState(false)
  const [showWaitDvPnl, setshowWaitDvPnl] = useState(false)

  const locPannelRef = useRef(null)
  const downArrowRef = useRef(null)
  const vehiclePnlRef = useRef(null)
  const findDriverPnlRef = useRef(null)
  const waitDriverPnlref = useRef(null)

  const [pickUp, setPickUp] = useState("")
  const [destination, setDestination] = useState("")
  const [pickUpSugg, setPickUpSugg] = useState([])
  const [destionationSugg, setDestinationSugg] = useState([])
  const [activeSugg, setActiveSugg] = useState('')
  

  const [fare , setFare ] = useState(null)


  // main location pannel
  useGSAP(() => {
    if (showLocPannel) {
      gsap.to(locPannelRef.current, {
        height: '75%',
        // opacity:1
        backgroundColor: "white"
      })
      gsap.to(downArrowRef.current, {
        opacity: 1,
        display: 'block'
      })
    } else {
      gsap.to(locPannelRef.current, {
        height: '0%',
      })
      gsap.to(downArrowRef.current, {
        display: 'none',
        opacity: 0
      })
    }
  }, [showLocPannel])

  // select vehicle pannel
  useGSAP(() => {
    if (showVehiclePnl) {
      gsap.to(vehiclePnlRef.current, {
        translateY: "0%",
      })
    } else {
      gsap.to(vehiclePnlRef.current, {
        translateY: "100%",
      })
    }
  }, [showVehiclePnl])

  // finding driver pannel 
  useGSAP(() => {
    if (showFindDriverPnl) {
      gsap.to(findDriverPnlRef.current, {
        translateY: "0%",
      })
    } else {
      gsap.to(findDriverPnlRef.current, {
        translateY: "100%",
      })
    }
  }, [showFindDriverPnl])

  // waiting for driver details pannel
  useGSAP(() => {
    if (showWaitDvPnl) {
      gsap.to(waitDriverPnlref.current, {
        translateY: "0%",
      })
    } else {
      gsap.to(waitDriverPnlref.current, {
        translateY: "100%",
      })
    }
  }, [showWaitDvPnl])

   

  const handlePickUpChange = async (e) => {
    setPickUp(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-suggestions/off`,
        {
          params: { input: e.target.value },
          headers: {
            authorization: "Bearer " +  localStorage.getItem('token')
          }
        }
      )
      setPickUpSugg(response.data.map(elem => elem.description))
    } catch (error) {
      console.log(error)
    }
  }
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value) 
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-suggestions/off`,
        {
          params: { input: e.target.value },
          headers: {
            authorization: "Bearer " +  localStorage.getItem('token')
          }
        }
      )
      setDestinationSugg(response.data.map(elem => elem.description))
    } catch (error) {
      console.log(error)
    }
  }
  const handleFindRide = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ride/get-fare`,
        {
          params: { 
            pickUp,
             destination
            },
            headers: {
              authorization: "Bearer " + localStorage.getItem('token')
            }
          }
        )
        setFare(response.data)
        setShowVehiclePnl(true)
        setShowLocPannel(false)
      // console.log(response.data.cost.car)
    } catch (error) {
      console.log(error)
    }
  }
  const [vehicle, setVehicle] = useState('')
  const handleCreateRide = async (vehicleType) => {
    setVehicle( vehicleType)
    setShowFDrPnl(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/ride/create/off`,
        { // Request body
          pickUp,
          destination,
          vehicleType,
        },
        { // Configuration object
          headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
          },
        }
      )
      console.log(response.data) 
    } catch (error) {
      console.log(error)
    }
  }
  


  return (
    <>
      <div className='flex overflow-hidden relative flex-col bg-cover bg-center bg-[url(https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif)] h-screen justify-between '>
        <img width={120} className='h-fit m-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="UBER" />

        <div className='absolute w-full z-1 h-screen flex flex-col justify-end '>
          {/* form box */}
          <div className='bg-white px-4 min-h-[25%] border-b-1 border-white relative '>
            <LocationInputs ref={downArrowRef} setShowLocPannel={setShowLocPannel} setActiveSugg={setActiveSugg} handleDestinationChange={handleDestinationChange}
              handlePickUpChange={handlePickUpChange} pickUp={pickUp} destination={destination} />
          </div>

          {/* location suggestion component */}
          <div ref={locPannelRef} className='h-0' >
            <LocationSearchPannel handleFindRide={handleFindRide} setPickUp={setPickUp} setDestination={setDestination} setShowVehiclePnl={setShowVehiclePnl} activeSugg={activeSugg} suggestions={activeSugg == 'pickup' ? pickUpSugg : destionationSugg} setShowLocPannel={setShowLocPannel} />
          </div>
        </div>

          {/* select vehicle from here */}
          <div ref={vehiclePnlRef} className='w-full h-screen  flex flex-col translate-y-full justify-end z-40 absolute '>
            <SelectVehicle  handleCreateRide={handleCreateRide} setShowVehiclePnl={setShowVehiclePnl} fare={fare} setShowLocPannel={setShowLocPannel} setShowFDrPnl={setShowFDrPnl} />
          </div>

          {/*findin driver */}
          <div ref={findDriverPnlRef} className='w-full h-screen flex flex-col translate-y-full justify-end z-40 absolute '>
            <FindingDriver setShowFDrPnl={setShowFDrPnl} vehicle={vehicle} pickUp={pickUp} destination={destination} fare={fare}/>
          </div>

          {/*waiting for driver to pick u up*/}
          <div ref={waitDriverPnlref} className='w-full h-screen flex flex-col translate-y-full justify-end z-40 absolute '>
            <WaitingForDriver />
          </div>


      </div>
    </>
  )
}

export default HomePage

{/* <Link to={'/logout'}>logout</Link>  */ }