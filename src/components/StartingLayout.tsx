import React from 'react'
import Background from './Background'

interface StartingLayoutProps {
  startHandler: () => void
}

export default function StartingLayout( { startHandler }: StartingLayoutProps ) {
  return (
      <div className='
      w-screen h-screen
      text-center
      flex flex-col items-center gap-4 justify-center' >
        <h1 className='text-6xl ' >Quizzle game!</h1>
        <p className='text-3xl px-[40px] sm:w-[665px] md:px-[100px] md:w-[785px] lg:w-[1024px]  ' >Some insane description here! Or just press da start button for start</p>
        <button onClick={startHandler} className='
        px-4 rounded-full
        bg-blue-400
        text-[2rem] text-[#f6f6f6]
        transition-all duration-100
        active:shadow-[inset_2px_2px_8px_1px_#00000040]

        ' >Start new Quizz</button>
      </div>
  )
}
