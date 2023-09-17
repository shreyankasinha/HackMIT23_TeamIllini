import React, { useState, useEffect } from 'react';

function ExamPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5005/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div>
      <p>{currentQuestion.Question}</p>
      <div>
        <label>
          <input 
            type="radio" 
            value="A" 
            checked={answers[currentQuestionIndex] === 'A'}
            onChange={handleOptionChange} 
          />
          {currentQuestion.Opt_A}
        </label>
        <label>
          <input 
            type="radio" 
            value="B" 
            checked={answers[currentQuestionIndex] === 'B'}
            onChange={handleOptionChange} 
          />
          {currentQuestion.Opt_B}
        </label>
        <label>
          <input 
            type="radio" 
            value="C" 
            checked={answers[currentQuestionIndex] === 'C'}
            onChange={handleOptionChange} 
          />
          {currentQuestion.Opt_C}
        </label>
        <label>
          <input 
            type="radio" 
            value="D" 
            checked={answers[currentQuestionIndex] === 'D'}
            onChange={handleOptionChange} 
          />
          {currentQuestion.Opt_D}
        </label>
      </div>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default ExamPage;