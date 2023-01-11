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
    <p className='question-number'>
      Question: { questionNumber } / { totalQuestions }
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map(answer => {
        return(
          <div key={ answer }>
            <button disabled={userAnswer ? true : false } value={ answer } onClick={ callback }>
              <p>{answer}</p>
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

export default QuestionCard;