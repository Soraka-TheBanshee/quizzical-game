import React from 'react'

interface MyErrorProps {
  error: string
}

export default function MyError( { error}:MyErrorProps ) {
  return (
    <>
      <div className='text-center text-5xl text-[#D0534E] font-bold mb-10 ' >Error: { error }</div>
    </>
  )
}
