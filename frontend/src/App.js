import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './assets/components/WelcomePage/index.js';
import ExamPage from './assets/components/ExamPage/index.js';
import ResultPage from './assets/components/ResultPage/index.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
