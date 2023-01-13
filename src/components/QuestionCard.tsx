import React from 'react';
import { AnswerObject } from '../App';
import '../styles/app.scss';

// Question Card Parameter types.
type Props = {
  question: string,
  answers: string[],
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
  userAnswer: AnswerObject,
  questionNumber: number,
  totalQuestions: number,
}

// Question Card Component
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions
}) => (
  <div className='question-card'>

  {/* Question Number display. */}
    <div className='question-number-container'>
      <div className='question-number-label'>
          <p className='question-number-text'>Question:</p>
          <div className='question-numbers'>
            <p className='question-number-current'>{questionNumber}</p>
            <p className='question-number-total'>{ totalQuestions }</p>
          </div>
      </div>
    </div>

    {/* Question and Answers */}
    <div className='question-answer'>
      <p className='question' dangerouslySetInnerHTML={{ __html: question }}></p> {/* Question */}
      
      {/* Answers Button */}
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