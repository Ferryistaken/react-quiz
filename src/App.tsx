import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

import './App.css';

// components
import QuestionCard from './Components/QuestionCard';

//types
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);

  // console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameover(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.e
    );


    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gameover) {
        // Get user answer
        const answer = e.currentTarget.value;

        // Check user answer against correct answer
        const correct = questions[number].correct_answer === answer;

        // Add score if answer is correct
        if (correct) setScore(prev => prev + 1);

        const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,
        };

        setUserAnswers(prev => [...prev, answerObject]);
      }
  };

  const nextQuestion = () => {
      // Move onto next question
      const nextQuestionIndex = number + 1;

      if (nextQuestionIndex === TOTAL_QUESTIONS) {
        setGameover(true);
      } else {
        setNumber(nextQuestionIndex);
      }
  }

  return (
    <div>
      <h1 className="text-3xl mx-8 my-6 transition ease-in-out delay-150 hover:translate-x-3 duration-350">
        React Trivia
      </h1>
      {gameover || userAnswers.length === TOTAL_QUESTIONS ? (
        <button
          className="text-xl font-semibold mx-8 mb-2 transition ease-in-out delay-150 hover:translate-x-1 duration-350"
          onClick={startTrivia}
        >
          Load Questions
        </button>
      ) : null}
      {!gameover ? <p className="mx-10 mb-2">Score: {score}</p> : null}
      {loading ? <p className="mx-10 mb-2">Loading Questions...</p> : null}
      {!loading && !gameover ? (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}

      <div className="mr-[10%] ml-[500px] mt-9">
        {!gameover &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <div className="relative group">
            <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-400 rounded-lg px-7 py-4 max-w-[180px] blur group-hover:opacity-100 transition duration-800"></div>
            <button
              className="relative px-7 py-4 bg-black rounded-lg leading-none "
              onClick={nextQuestion}
            >
              <span className="text-cyan-400 group-hover:text-purple-400 transition duration-800">
                Next Question
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
