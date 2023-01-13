import { shuffleQuestions } from "./utils";

// fetched questions type.
export type Question = {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string,
}

// extend Question.
export type QuestionState = Question & { answers: string[]};

// question difficulties.
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARM = 'hard',
}


// Question Categories
export const Category = [
  { id: 0, name: 'Any Category' },
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Books' },
  { id: 11, name: 'Film' },
  { id: 12, name: 'Music' },
  { id: 13, name: 'Musicals & Theatres' },
  { id: 14, name: 'Television' },
  { id: 15, name: 'Video Games' },
  { id: 16, name: 'Board Games' },
  { id: 17, name: 'Science and Nature' },
  { id: 18, name: 'Computers' },
  { id: 19, name: 'Mathematics' },
  { id: 20, name: 'Mythology' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 25, name: 'Art' },
  { id: 26, name: 'Celebrities' },
  { id: 27, name: 'Animals' },
  { id: 28, name: 'Vehicles' },
  { id: 29, name: 'Comics' },
  { id: 30, name: 'Gadgets' },
  { id: 31, name: 'Japanese and Manga' },
  { id: 32, name: 'Cartoon and Animations' },
];

// Fetch questions
export const fetchQuizQuestions = async(amount: number, difficulty: Difficulty, category: number) => {
  
  // Endpoint
  let endPoint = `https://opentdb.com/api.php?`
                  + `amount=${amount}` 
                  + `&difficulty=${difficulty}`
                  + (category == 0 ? "" : `&category=${Category[category].id}`)
                  + `&type=multiple`;
  
  // Promise to JSON
  let data = await(await fetch(endPoint)).json();

  // Shuffle Questions and add Answers.
  return(data.results.map((question: Question) => (
    {
      ...question,
      answers: shuffleQuestions([...question.incorrect_answers, question.correct_answer])
    }
  )));
}