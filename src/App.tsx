import React, { MouseEvent, useEffect, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { Category, fetchQuizQuestions } from "./API";
import { Difficulty } from "./API";
import { QuestionState } from "./API";
import "./styles/app.scss";

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
  const [fetchFail, setFetchFail] = useState(false);
  const [gameEnd, setGameEnd] = useState(true);

  async function startTrivia(){
    setQuestions([]);
    setLoading(true);
    setGameOver(false);
    setFetchFail(false);

    const newQuestions = await fetchQuizQuestions(
      questionAmount,
      Difficulty.EASY,
      category,
    );

    if(newQuestions.length > 0) {
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } else {
      setLoading(false);
      setGameOver(true);
      setFetchFail(true);
    }
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

  const newGame = () => {
    setGameEnd(true);
    const endScore = document.querySelector('.score') as HTMLParagraphElement;
    const endScoreBtn = document.querySelector('.btn-next') as HTMLButtonElement;
    endScore.classList.remove('end-score');
    endScoreBtn.classList.remove('end-score-btn');
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if(nextQuestion === totalQuestions) {
      setGameOver(true);
      const endScore = document.querySelector('.score') as HTMLParagraphElement;
      const endScoreBtn = document.querySelector('.btn-next') as HTMLButtonElement;
      endScore.classList.add('end-score');
      endScoreBtn.classList.add('end-score-btn');
      setGameEnd(false);
    } else {
      setNumber(nextQuestion);
    }
  }

  if(!gameOver && !loading) {
    window.document.title = `Quizard - ${Category[category].name}`;
    const subtitle = document.querySelector('.subtitle') as HTMLHeadingElement;
    subtitle.textContent = `${Category[category].name}`;
  }

  return(
    <div className="App">
      <div className="body">
        <div className="game-interface">
          <div className="title-container">
            <h1 className="title">Quizard</h1>
            {(!gameOver || !gameEnd) || loading? (<h2 className="subtitle" >Fetching...</h2>) : (null)}
          </div>


          {gameOver && gameEnd ? (
            <div className="game-setup">


              <div className="setup-options">
                <div className="setup-option">
                  <label className="option-label" htmlFor="category">Category</label>
                  <select
                    className="select-category"
                    name="category"
                    id="category"
                    onChange={ (e) => {
                      setFetchFail(false);
                      setCategory(Number(e.target.value));
                    } }
                    value={ category }
                  >
                    {Category.map((cat, index ) => (
                      <option
                        key={ index }
                        value={ index }
                      >{ cat.name }</option>
                    ))}
                  </select>
                  {fetchFail ? (
                    <p className="fetch-fail message">No questions available for <span>{ Category[category].name }</span>!</p>
                  ) : (
                    null
                  )}
                </div>


                <div className="setup-option">
                  <label className="option-label" htmlFor="questionAmount">Questions</label>
                  <input
                    type="number"
                    name="questionAmount"
                    id="questionAmount"
                    min={1}
                    max={50}
                    className="input-field-setup"
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


              <div className="start-container">
                <button
                  className="start btn-start"
                  onClick={() => {
                    setTotalQuestions(questionAmount);
                    startTrivia();
                  }}
                  onMouseOver={(e) => {
                    const startBtnParent = e.currentTarget.parentElement!;
                    startBtnParent.style.padding = "4px 0 0 0";
                  }}
                  onMouseOut={(e) => {
                    const startBtnParent = e.currentTarget.parentElement!;
                    startBtnParent.style.padding = "0 0 4px 0";
                  }}
                >
                  Start
                </button>
              </div>
            </div>
          ) : (
            null
          )}


          {!gameOver || !gameEnd ? (
            <div className="score-container">
              <p className="score">Score: <span className="score-number">{score}</span></p>
              {gameOver && !gameEnd ? (
                <p className="end-score-label">You scored { score } out of { totalQuestions}!</p>
              ) : (
                null
              )}
            </div>
          ) : (
            null
          )}
          {loading ? (
            <div className="loading-container">
              <p className="loading-questions">Loading Questions...</p>
              <div id="loader">
                <div id="spinner-back"></div>
                <div id="spinner"></div>
              </div>
            </div>
          ) : (
            null
          )}


          {!loading && !gameOver && questions.length > 0? (
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


          {(!gameOver || !gameEnd) && !loading && number !== totalQuestions ? (
            <div className="next-container">
              {!gameOver ? (
                <button
                  type="button"
                  className="next btn-next"
                  onClick={nextQuestion}
                  onMouseOver={(e) => {
                    const nextBtnParent = e.currentTarget.parentElement as HTMLDivElement;
                    if(!(nextBtnParent.childNodes[0] as HTMLButtonElement).disabled){
                      nextBtnParent.style.padding = "2px 0 0 0";
                    }
                  }}
                  onMouseOut={(e) => {
                    const nextBtnParent = e.currentTarget.parentElement as HTMLDivElement;
                    nextBtnParent.style.padding = "0 0 2px 0";
                  }}
                  disabled={ userAnswers.length != number + 1 ? true : false }
                >
                  { number !== totalQuestions - 1 ? "Next Question" : "Next" }
                </button>
              ) : (
                <button
                  type="button"
                  className="next btn-next"
                  onClick={newGame}
                  onMouseOver={(e) => {
                    const nextBtnParent = e.currentTarget.parentElement as HTMLDivElement;
                    if(!(nextBtnParent.childNodes[0] as HTMLButtonElement).disabled){
                      nextBtnParent.style.padding = "4px 0 0 0";
                    }
                  }}
                  onMouseOut={(e) => {
                    const nextBtnParent = e.currentTarget.parentElement as HTMLDivElement;
                    nextBtnParent.style.padding = "0 0 4px 0";
                  }}
                  disabled={ userAnswers.length != number + 1 ? true : false }
                >
                  New Game
                </button>
              )}
            </div>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}

export default App;