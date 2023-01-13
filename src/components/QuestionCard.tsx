import React from 'react';
import { AnswerObject } from '../App';
import '../styles/app.scss';

type Props = {
  question: string,
  answers: string[],
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
  userAnswer: AnswerObject,
  questionNumber: number,
  totalQuestions: number,
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions
}) => (
  <div className='question-card'>
    {/* <p className='question-number'>
      Question: { questionNumber } / { totalQuestions }
    </p> */}
    <div className='question-number-container'>
      <div className='question-number-label'>
          <p className='question-number-text'>Question:</p>
          <div className='question-numbers'>
            <p className='question-number-current'>{questionNumber}</p>
            <p className='question-number-total'>{ totalQuestions }</p>
          </div>
      </div>
    </div>
    <div className='question-answer'>
      <p className='question' dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className='answers'>
        {answers.map((answer, index) => {
          return(
            <button type='button' className='answer' key={ index } disabled={userAnswer ? true : false } value={ answer } onClick={ callback }>
              <p>{answer}</p>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default QuestionCard;