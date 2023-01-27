import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import APIResponseResults from "../interfaces/APIResponseResults";
import IQuizzle from "../interfaces/IQuizzle";

const fetchQuizzles = async (setQuizzles:(value: React.SetStateAction<IQuizzle[]>) => void) => {
  const response = await axios.get('https://opentdb.com/api.php?amount=7');

  const fetchedQuizzles = response.data.results

  setQuizzles(() => fetchedQuizzles.map((q:APIResponseResults):IQuizzle => ({id: nanoid(), 
    question: q.question, 
    correct_answer: q.correct_answer, 
    answers: [...q.incorrect_answers, q.correct_answer].map(a => ({ id: nanoid(), value: a, isChecked: false }))
  })));
  
}

const useFetchQuizzlesState = () => {
  const [quizzles, setQuizzles] = useState<IQuizzle[]>([])

  useEffect(() => {
    fetchQuizzles(setQuizzles)
  }, [])

  const state:[IQuizzle[], React.Dispatch<React.SetStateAction<IQuizzle[]>> ] = [quizzles, setQuizzles]
  return state
}

export { useFetchQuizzlesState, fetchQuizzles } 