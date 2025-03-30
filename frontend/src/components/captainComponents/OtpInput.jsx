import React, {  useRef } from 'react'

const OtpInput = ({otp, setOtp} ) => {
  const inputRef = useRef([])

  const handleChange = (e, indx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');

    if (indx < otp.length - 1 && value) {
      inputRef.current[indx + 1].focus()
    }
    const newOtp = [...otp];
    newOtp[indx] = value
    setOtp(newOtp)
  }

  const handleBackspace = (e, indx) => {
    if (indx > 0 && e.key === "Backspace" && otp[indx] == '') {
      inputRef.current[indx - 1].focus()
    }
  }

  return (
    <div className='flex items-center justify-center gap-2 '>
      {otp.map((_e, indx) => {
          return <input
            type="text"
            maxLength={1}
            className='bg-white border-2 w-12 text-center h-13 focus:border-black outline-0 border-gray-500 rounded-sm'
            key={indx}
            onChange={(e) => handleChange(e, indx)}
            ref={(el) => (inputRef.current[indx] = el)}
            onKeyDown={(e) => handleBackspace(e, indx)}
          />

        })}
    </div>
  )
}

export default OtpInput
