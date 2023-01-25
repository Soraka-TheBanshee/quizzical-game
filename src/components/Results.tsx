import React from 'react'

interface ResultsProps {
  result: string
}

export default function Results( { result }:ResultsProps ) {
  const resultString = result === '-1'?'Please answer to all questions':<span>Your result is <span className='font-bold spacing wordstight' >{result + ' out of 7'}</span> !</span>

  return (
    <p className='
    text-[1.5rem] 
    text-[#403B47] 
    md:border-b-2 md:border-dashed md:border-[#403B47] ' >
      {resultString}
    </p>
  )
}
