import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Quizzle from './components/Quizzle';
import IQuizzle from './interfaces/IQuizzle';
import Background from './components/Background';
import CheckQuizBtn from './components/CheckQuizBtn';
import StartingLayout from './components/StartingLayout';
import Results from './components/Results';
import { fetchQuizzles, useFetchQuizzlesState } from './hooks/hooks';




function App() {

  // const [quizzles, setQuizzles] = useState<IQuizzle[]>([])
  const [isQuizzDone, setQuizzDone] = useState<boolean>(false)
  const [isGameStarted, setGameStarted] = useState<boolean>(false)
  const [finalResult, setFinalResult] = useState<string>('0')

  // const fetchQuizzles = async () => {
  //   const response = await axios.get('https://opentdb.com/api.php?amount=7');

  //   const fetchedQuizzles = response.data.results

  //   setQuizzles(() => fetchedQuizzles.map((q:APIResponseResults):IQuizzle => ({id: nanoid(), 
  //     question: q.question, 
  //     correct_answer: q.correct_answer, 
  //     answers: [...q.incorrect_answers, q.correct_answer].map(a => ({ id: nanoid(), value: a, isChecked: false }))
  //   })));
    
    
  // }
  
  // useEffect(() => {
  //   fetchQuizzles()
  // }, [])

  const [quizzles, setQuizzles] = useFetchQuizzlesState()

  const answerHandler = (quizzleId: string, answerId: string):void => {    
    !isQuizzDone&&setQuizzles(oldQuizzles => oldQuizzles.map(q => {      

      if (quizzleId === q.id){
        return {...q, answers: q.answers.map(a => {
          
          return a.id === answerId?{...a, isChecked: !a.isChecked}:{...a, isChecked: false}
        })}
      } else {
        return q
      }
    }))
  }


  const startNewQuizz = () => {
    setQuizzDone(false)
    fetchQuizzles(setQuizzles)
  }

  const checkFinalResult = () => {
    

    let result = 0;
    let isAllAnswersChecked = false;
    
    for (const quizzle of quizzles) {
      isAllAnswersChecked = false;
      
      for (const answer of quizzle.answers) {
        if (answer.isChecked) {
          isAllAnswersChecked = true
          if (answer.value === quizzle.correct_answer) {
            result++
          }
        }
      }
      if (!isAllAnswersChecked) {
        break
      }
    }

    if (isAllAnswersChecked) {
      setFinalResult(result.toString())
      setQuizzDone(true)

    } else {
      setFinalResult('-1')
    }
  }


  return (
    <>
      <Background />

      {
      isGameStarted?
      <>
        <div className='flex justify-center mt-10' >
          <div className='py-5 px-10 max-w-5xl bg-[#00000019] shadow-[0_15px_15px_40px_rgba(0,0,0,0.1)]' >
            <div className='text-center text-5xl text-[#D0534E] font-bold mb-10 ' >Quizzle game!</div>
            {quizzles.map(q => <Quizzle quizzle={q} isQuizzDone={isQuizzDone} key={q.id} answerHandler={answerHandler} />)}
        
            <div className='flex flex-col md:flex-row justify-center items-center my-10 gap-2 md:gap-4' >
              { (isQuizzDone || finalResult === '-1')&&<Results result={finalResult} /> }
              <CheckQuizBtn clickHandler={isQuizzDone?startNewQuizz:checkFinalResult} isQuizzDone={isQuizzDone} />
            </div>
          </div>
        </div>
      </>:
      <StartingLayout startHandler={() => {
        setGameStarted(true)
        startNewQuizz()
      }} />
      
      }


    </>
  );
}

export default App;
