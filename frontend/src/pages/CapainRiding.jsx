import React, { useRef, useState } from 'react'
import { RiArrowUpWideLine } from "react-icons/ri";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRidePannel from '../components/captainComponents/FinishRidePannel';
import { Link } from 'react-router-dom';

const CapainRiding = () => {
    const [finishRidePnl, setFinishRidePnl] = useState(false)

    const finishRidePnlRef = useRef(null)

    useGSAP(() => {
        if (finishRidePnl) {
            gsap.to(finishRidePnlRef.current, {
                translateY: "0%",
            })
        } else {
            gsap.to(finishRidePnlRef.current, {
                translateY: "100%",
            })
        }
    }, [finishRidePnl])
    return (
        <div className='flex relative  flex-col bg-cover bg-center bg-[url(https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif)] h-screen justify-between '>

            <div className='absolute flex z-10  items-center justify-between top-0 w-full'>
                <img width={120} className='h-fit m-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="UBER" />
                {/* <Link to={'/captain-logout'} className='text-4xl bg-[#F1F2F6] p-2 rounded-full mx-3 font-extrabold' ><IoIosLogOut /></Link> */}
            </div>

            <div className=' w-full h-screen absolute top-0 flex flex-col justify-end overflow-hidden'>
                {/* captain details */}
                <div className='bg-[#FF8900] px-4 flex flex-col items-center'>
                    <span
                    onClick={()=>setFinishRidePnl(true)} 
                     className='text-3xl scale-x-125'><RiArrowUpWideLine /></span>
                    <div className='items-center justify-between w-full flex my-4 '>
                        <h1 className='py-2 rounded-lg grow text-2xl w-fit  font-bold  '>4 Km Away </h1>
                        <Link to={'/captain-home'} className='py-2 px-4  rounded-lg text-xl  font-bold text-[#F1F2F6] bg-[#12b312]'> Complete Ride </Link>
                    </div>
                </div>

                {/* compelete  ride  */}
                <div ref={finishRidePnlRef} className='w-full h-screen flex flex-col justify-end z-40 translate-y-full absolute '>
                    <FinishRidePannel setFinishRidePnl={setFinishRidePnl} />
                </div>



            </div>
        </div>
    )
}

export default CapainRiding
