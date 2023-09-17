import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#e0f7fa' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <img src="/illiniblock.jpg" alt="Illinois Logo" style={{ width: '100px', height: '100px' }} />
      </div>
      <h1 style={{ fontSize: '48px', color: '#00796b', marginBottom: '20px' }}>Welcome to the Mastery-Based Assessment App</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center', color: '#004d40' }}>
        <label style={{ fontSize: '20px' }}>
          Exam Description: 
          <span style={{ fontWeight: 'normal' }}> This exam adapts to your knowledge level to provide a personalized assessment experience. Get ready to challenge yourself!</span>
        </label> 
      </div>
      <Link to="/exam">
        <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#00897b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          Start Exam
        </button>
      </Link>
    </div>
  );
}

export default WelcomePage;
