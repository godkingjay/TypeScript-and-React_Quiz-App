import { shuffleQuestions } from "./utils";

export type Question = {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string,
}

export type QuestionState = Question & { answers: string[]};

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARM = 'hard',
}

export const fetchQuizQuestions = async(amount: number, difficulty: Difficulty) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await(await fetch(endPoint)).json();
  return(data.results.map((question: Question) => (
    {
      ...question,
      answers: shuffleQuestions([...question.incorrect_answers, question.correct_answer])
    }
  )));
}