import React, { useCallback, useEffect, useState } from 'react';
import Quizzle from './components/Quizzle';
import Background from './components/Background';
import CheckQuizBtn from './components/CheckQuizBtn';
import StartingLayout from './components/StartingLayout';
import Results from './components/Results';
import useFetchQuizzlesState from './hooks/useFetchQuizzlesState';
import Loading from './components/Loading';
import MyError from './components/MyError';
import useCheckFinalResult from './hooks/useCheckFinalResult';




function App() {

  const [isGameStarted, setGameStarted] = useState<boolean>(false)

  const {quizzles, isLoading, myError, setMyError, setQuizzles, fetchQuizzles} = useFetchQuizzlesState()
  const { isQuizzDone, setQuizzDone, finalResult, checkFinalResult } = useCheckFinalResult(quizzles)

  const startNewQuizz = useCallback(() => {
    setMyError('')
    setQuizzDone(false)
    fetchQuizzles()
    .then(data => setQuizzles(data))
  }, [setMyError, fetchQuizzles, setQuizzles, setQuizzDone])

  useEffect(() => {
    startNewQuizz()
  }, [startNewQuizz])

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

  return (
    <>
      <Background />

      {
      isGameStarted?
      <>
        <div className='flex justify-center mt-10' >
          <div className='py-5 px-10 max-w-5xl bg-[#00000019] shadow-[0_15px_15px_40px_rgba(0,0,0,0.1)]' >
            
            {
            isLoading?
            <Loading />:
            myError? 
            
              <div className='flex flex-col items-center ' >
                <MyError error={myError} />
                <button 
                onClick={() => {
                  startNewQuizz()
                }}
                className='
                px-4 rounded-full
                bg-blue-400
                text-[2rem] text-[#f6f6f6]
                transition-all duration-100
                active:shadow-[inset_2px_2px_8px_1px_#00000040]
                ' >Refesh da game</button>
              </div>

            :
            <div className='text-center text-5xl text-[#D0534E] font-bold mb-10 ' >Quizzle game!</div>
            }

            {quizzles.map(q => <Quizzle quizzle={q} isQuizzDone={isQuizzDone} key={q.id} answerHandler={answerHandler} />)}
        
            {!isLoading&&!myError&&<div className='flex flex-col md:flex-row justify-center items-center my-10 gap-2 md:gap-4' >
              { (isQuizzDone || finalResult === '-1')&&<Results result={finalResult} /> }
              <CheckQuizBtn clickHandler={isQuizzDone?startNewQuizz:checkFinalResult} isQuizzDone={isQuizzDone} />
            </div>}
          </div>
        </div>
      </>:
      <StartingLayout startHandler={() => {
        setGameStarted(true)
      }} />
      
      }


    </>
  );
}

export default App;
