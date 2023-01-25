import React from 'react'
import IQuizzle from '../interfaces/IQuizzle'
import Answer from './Answer';
const he = require('he')

interface QuizzleProps {
    quizzle: IQuizzle
    answerHandler: (quizzleId: string, answerId: string) => void
    isQuizzDone: boolean
}



export default function Quizzle({ quizzle, isQuizzDone, answerHandler }: QuizzleProps) {

    const question = he.decode(quizzle.question);
    const answers = quizzle.answers.map(a => ({answer: he.decode(a.value), id: a.id, isChecked: a.isChecked }))


    const getAnswersNode = (answers: {answer:string, id: string, isChecked: boolean }[]) => {
        return answers.map(a => <Answer 
            key={a.id} 
            value={a.answer} 
            isChecked={a.isChecked}
            isCorrect={a.answer === he.decode(quizzle.correct_answer)}
            isQuizzDone={isQuizzDone}
            answeHandler={() => answerHandler(quizzle.id, a.id)} 
        />)
    } 

    return (
        <div className='mb-8 border-b-[#C3C99F] border-b-4 border-dashed' >
            <div className='kavoon text-[2rem] text-[#403B47]  ' >{question}</div>
            <div className='flex gap-4 flex-wrap mb-3 px-2'  >
                {getAnswersNode(answers)}
            </div>
        </div>
    )
}
