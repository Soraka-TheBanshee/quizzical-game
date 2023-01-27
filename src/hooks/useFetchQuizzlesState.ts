import axios from "axios";
import { nanoid } from "nanoid";
import { useState, useCallback } from "react";
import APIResponseResults from "../interfaces/APIResponseResults";
import IQuizzle from "../interfaces/IQuizzle";



const useFetchQuizzlesState = () => {
  const [quizzles, setQuizzles] = useState<IQuizzle[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [myError, setMyError] = useState<string>('')

  const fetchQuizzles = useCallback(async ():Promise<IQuizzle[]> => {
    setLoading(true)

    try {
      
      const response = await axios.get<{results:APIResponseResults[]}>('https://opentdb.com/api.php?amount=7');
      const fetchedQuizzles = response.data.results;
      
      const apiError = "Incorrect API response"
      if (fetchedQuizzles.length !== 7) {
        throw new Error(apiError);
      } else {
        fetchedQuizzles.forEach(q => {
          if (!q.correct_answer||!q.incorrect_answers||!q.question) {
            throw new Error(apiError);
          }
        })
      }

      setLoading(false)
      return fetchedQuizzles.map((q:APIResponseResults):IQuizzle => ({id: nanoid(), 
        question: q.question, 
        correct_answer: q.correct_answer, 
        answers: [...q.incorrect_answers, q.correct_answer].map(a => ({ id: nanoid(), value: a, isChecked: false }))
      }));
      
    } catch (error) {
      setLoading(false)
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setMyError(message)
      return []
    }

  
    
    
  }, [])

  return {
    quizzles,
    isLoading,
    myError,
    setMyError,
    setQuizzles,
    fetchQuizzles
  }
}

export default useFetchQuizzlesState  