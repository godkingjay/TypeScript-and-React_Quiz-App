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

export const Category = [
  { id: 0, name: 'Any Category' },
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Books' },
  { id: 11, name: 'Film' },
  { id: 12, name: 'Music' },
  // { id: 13, name: 'Musicals & Theatres' },
  { id: 14, name: 'Television' },
  { id: 15, name: 'Video Games' },
  { id: 16, name: 'Board Games' },
  { id: 17, name: 'Science and Nature' },
  { id: 18, name: 'Computers' },
  // { id: 19, name: 'Mathematics' },
  { id: 20, name: 'Mythology' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  // { id: 24, name: 'Politics' },
  // { id: 25, name: 'Art' },
  { id: 26, name: 'Celebrities' },
  { id: 27, name: 'Animals' },
  { id: 28, name: 'Vehicles' },
  { id: 29, name: 'Comics' },
  // { id: 30, name: 'Gadgets' },
  { id: 31, name: 'Japanese and Manga' },
  { id: 32, name: 'Cartoon and Animations' },
];

export const fetchQuizQuestions = async(amount: number, difficulty: Difficulty, category: number) => {
  let endPoint = `https://opentdb.com/api.php?`
                  + `amount=${amount}` 
                  + `&difficulty=${difficulty}`
                  + (category == 0 ? "" : `&category=${category}`)
                  + `&type=multiple`;
  const data = await(await fetch(endPoint)).json();
  return(data.results.map((question: Question) => (
    {
      ...question,
      answers: shuffleQuestions([...question.incorrect_answers, question.correct_answer])
    }
  )));
}