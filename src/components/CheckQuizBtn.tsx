import React from 'react'

interface CheckQuizBtnProps {
  clickHandler: () => void
  isQuizzDone: boolean
}

export default function CheckQuizBtn( { clickHandler, isQuizzDone }:CheckQuizBtnProps ) {
  return (
    <button 
    onClick={clickHandler}

    className='
    px-4
    bg-[#a6ce65ea] rounded-full
    text-[2rem] text-[#f6f6f6]
    active:bg-[#ced954ea]
    transition-all duration-100
    active:shadow-[inset_2px_2px_8px_1px_#00000040]
     ' >{isQuizzDone?'Start New Quizz':'Check Quiz'}</button>
  )
}
