import React, { useState, useEffect } from 'react';
import Timer from '../Timer';

function ExamPage({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    if (option === currentQuestion.Correct) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    setScore(0);
  }, [questions]);

  return (
    <div>
      <Timer startTime={Date.now()} />
      {currentQuestion && (
        <div>
          <h2>{currentQuestion.Question}</h2>
          <div>
            {['A', 'B', 'C', 'D'].map((option) => (
              <div key={option}>
                <label>
                  <input 
                    type="radio" 
                    name="answer" 
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  {currentQuestion[`Opt_${option}`]}
                </label>
              </div>
            ))}
          </div>
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
          <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
        </div>
      )}
    </div>
  );
}

export default ExamPage;
