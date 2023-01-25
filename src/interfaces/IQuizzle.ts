interface IAnswer {
    id: string
    value: string
    isChecked: boolean
}

export default interface IQuizzle {
    question: string
    correct_answer: string
    answers: IAnswer[]
    id: string
}

