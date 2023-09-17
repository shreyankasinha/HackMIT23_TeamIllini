import React, { useState, useEffect } from 'react';

function Timer({ startTime }) {
  const [timeRemaining, setTimeRemaining] = useState(60 * 60 * 1000); // 60 minutes in milliseconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      setTimeRemaining(60 * 60 * 1000 - elapsedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  return <div>Time Remaining: {Math.floor(timeRemaining / 60000)}:{((timeRemaining % 60000) / 1000).toFixed(0)}</div>;
}

export default Timer;
