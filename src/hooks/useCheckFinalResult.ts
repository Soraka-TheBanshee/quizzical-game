import { useState } from "react";
import IQuizzle from "../interfaces/IQuizzle";


const useCheckFinalResult = (quizzles:IQuizzle[]) => {
  const [finalResult, setFinalResult] = useState<string>('0');
  const [isQuizzDone, setQuizzDone] = useState<boolean>(false);

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
  

  return {
    finalResult,
    checkFinalResult,
    isQuizzDone,
    setQuizzDone,
  }
}

export default useCheckFinalResult