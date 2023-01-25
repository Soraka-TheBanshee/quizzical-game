import React from 'react'
import akashiImg from '../imgs/AkashiNomsFish.png'

// interface BackgroundProps {
//   zIndex: number
// }

export default function Background(  ) {
  // const z = zIndex<0?`-z-[${(Math.abs(zIndex)).toString()}]`:`z-[${zIndex.toString()}]`

  return (
    <>
    <div className={`fixed -z-10 left-0 bottom-0 flex items-end `} >
        <img className='w-56' src={akashiImg} alt="leftsided Akashi" />
        <span className='
        hidden
        md:inline
        -translate-y-4 ml-4 
        varela
        text-[2rem]
        tracking-wider
        text-gray-300
        ' >Leftsided Akashi</span>
    </div>
    <div className={`fixed -z-10 right-0 top-0 flex items-start `} >
        <span className='
        hidden
        md:inline
        translate-y-6 mr-4 
        varela
        text-[2rem]
        tracking-wider
        text-gray-300
        ' >Rightsided Akashi</span>
        <img className='w-56' src={akashiImg} alt="Rightsided Akashi" />
    </div>
    </>
  )
}
