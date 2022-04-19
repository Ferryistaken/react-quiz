import React from 'react';
import { AnswerObject } from '../App';

type QuestionCardProps = {
	question: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: AnswerObject | undefined;
	questionNumber: number;
	totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }) => (
	<div className="mx-10">
		<p className="my-1 mb-3">
			Question: {questionNumber} / {totalQuestions}
		</p>
		<p className="font-semibold mb-2" dangerouslySetInnerHTML={{ __html: question }} />
		<div>
			{answers.map(answer => (
				<div key={answer} className='transition ease-in-out delay-150 hover:translate-x-1 duration-350'>
					<button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
						<span dangerouslySetInnerHTML={{ __html: answer }} />
					</button>
				</div>
			))}
		</div>
	</div>
);

export default QuestionCard;