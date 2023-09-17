import React, { useState, useEffect } from 'react';
import questionsData from './data.json';
import Timer from '../Timer'; 

function ExamPage() {
  const [questions] = useState(() => {
    const sortedQuestions = { 1: [], 2: [], 3: [] };
    questionsData.forEach(question => {
      sortedQuestions[question.Difficulty].push(question);
    });
    return sortedQuestions;
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState(1);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (streak === 5 && currentDifficulty < 3) {
      setCurrentDifficulty(currentDifficulty + 1);
      setStreak(0);
      setCurrentQuestionIndex(0);
    }
  }, [streak, currentDifficulty]);

  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentDifficulty][currentQuestionIndex].Correct;

    if (answer === correctAnswer) {
      setStreak(prevStreak => prevStreak + 1);
      setScore(prevScore => streak + prevScore + 1);
    } else {
      setStreak(0);
      if (currentDifficulty > 1) {
        setCurrentDifficulty(currentDifficulty - 1);
      }
    }

    if (currentQuestionIndex < 24) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Logic for when the exam ends (e.g., navigate to results page)
      console.log("Exam finished!"); // Replace this with actual navigation logic to the results page
    }
  };

  const currentQuestion = questions[currentDifficulty][currentQuestionIndex % questions[currentDifficulty].length];

  if (!currentQuestion) {
    return <p>No more questions available.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e0f7fa', minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h2>Question {currentQuestionIndex + 1} : Math Assessment</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '10px', backgroundColor: '#e0e0e0', marginRight: '10px', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${(streak / 5) * 100}%`, height: '10px', backgroundColor: '#76d275' }}></div>
          </div>
          <Timer />
        </div>
      </div>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '60%' }}>
        <h3 style={{ marginBottom: '20px' }}>{currentQuestion.Question}</h3>
        <p style={{ marginBottom: '20px', textAlign: 'right' }}>Score: {score}/100</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={{ margin: '10px', padding: '10px', width: '200px', fontSize: '16px', borderRadius: '5px' }} onClick={() => handleAnswer('A')}>{currentQuestion.Opt_A}</button>
          <button style={{ margin: '10px', padding: '10px', width: '200px', fontSize: '16px', borderRadius: '5px' }} onClick={() => handleAnswer('B')}>{currentQuestion.Opt_B}</button>
          <button style={{ margin: '10px', padding: '10px', width: '200px', fontSize: '16px', borderRadius: '5px' }} onClick={() => handleAnswer('C')}>{currentQuestion.Opt_C}</button>
          <button style={{ margin: '10px', padding: '10px', width: '200px', fontSize: '16px', borderRadius: '5px' }} onClick={() => handleAnswer('D')}>{currentQuestion.Opt_D}</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {currentQuestionIndex > 0 && <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px' }} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>Previous</button>}
          {currentQuestionIndex < 24 && <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px' }} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>}
        </div>
      </div>
    </div>
  );
}

export default ExamPage;
