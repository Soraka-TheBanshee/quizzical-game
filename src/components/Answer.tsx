import React from 'react'

interface AnswerProps {
    value: string
    isChecked: boolean
    isCorrect: boolean
    isQuizzDone: boolean
    answeHandler: () => void
}

export default function Answer( { value, answeHandler, isChecked, isCorrect, isQuizzDone }:AnswerProps ) {
  const answerStyles =['text-[#0b150291]', '']
  
  if (isChecked&&!isQuizzDone) {
    answerStyles[1] = 'bg-[#DDC57D]'
  } else if (isChecked&&isQuizzDone&&!isCorrect) {
    answerStyles[1] = 'bg-[#DDC57D]'
    answerStyles[0] = 'text-[#D0534E]'
  } else if (isChecked&&isQuizzDone&&isCorrect) {
    answerStyles[1] = 'bg-[#DDC57D]'
    answerStyles[0] = 'text-[#5bdf3a]'
  } else if (!isChecked&&isCorrect&&isQuizzDone) {
    answerStyles[1] = 'bg-white'
    answerStyles[0] = 'text-[#5bdf3a]'
  }

  return (
    <div 
    onClick={answeHandler}
    

    className={`
    cursor-pointer
    text-[2rem] text-center  ${answerStyles[0] + ' ' + answerStyles[1]}
    border-solid border-[#CFDEB4] border-4 rounded-full 
    px-4 `} >{value}</div>
  )
}

//text-[#6C7063]