import React, { MouseEvent, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { Category, fetchQuizQuestions } from "./API";
import { Difficulty } from "./API";
import { QuestionState } from "./API";

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string,
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [questionAmount, setQuestionAmount] = useState(10);
  const [category, setCategory] = useState(0);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      questionAmount,
      Difficulty.EASY,
      category,
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) {
        setScore(prev => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if(nextQuestion === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return(
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === totalQuestions ? (
        <div>
          <div>
            <div>
              <label htmlFor="category">Category</label>
              <select name="category" id="category" onChange={ (e) => setCategory(Number(e.target.value)) }>
                {Category.map((category, index ) => (
                  <option key={ index } value={ category.id }>{ category.name }</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="questionAmount">Questions</label>
              <input
                type="number"
                name="questionAmount"
                id="questionAmount"
                min={1}
                max={50}
                onBlur={(e) => {
                  if (e.target.valueAsNumber == 0 || e.target.value.length == 0) e.target.value = "1";
                  else if (e.target.valueAsNumber > 50) e.target.value = "50";
                  setQuestionAmount(e.target.valueAsNumber);
                }}
                placeholder="1 - 50"
                defaultValue={ questionAmount }
                >
              </input>
            </div>
          </div>
          <button className="start" onClick={() => {
            setTotalQuestions(questionAmount);
            startTrivia();
          }}>
            Start
          </button>
        </div>
      ) : (
        null
      )}
      {!gameOver ? (
        <p className="score">Score: {score}</p>
      ) : (
        null
      )}
      {loading ? (
        <p className="loading-questions">Loading Questions...</p>
      ) : (
        null
      )}
      {!loading && !gameOver ? (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={ totalQuestions }
          question={ questions[number].question }
          answers={ questions[number].answers }
          userAnswer={ userAnswers[number] }
          callback={ checkAnswer }
        />
      ) : (
        null
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== totalQuestions - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : (
        null
      )}
    </div>
  );
}

export default App;