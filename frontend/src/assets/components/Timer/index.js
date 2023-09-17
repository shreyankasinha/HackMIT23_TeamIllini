import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(60 * 60); // 60 minutes in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      Time Left: {minutes}m {seconds}s
    </div>
  );
}

export default Timer;
