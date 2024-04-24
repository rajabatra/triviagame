import React, { useState, useEffect } from 'react';
import "./game.css";
function TriviaGame() {
  const [question, setQuestion] = useState(null);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://the-trivia-api.com/api/questions?limit=1');
      const data = await response.json();
      if (data && data.length > 0) {
        const item = data[0];
        setQuestion({
          text: item.question,
          options: [...item.incorrectAnswers, item.correctAnswer].sort(() => Math.random() - 0.5),
          correctAnswer: item.correctAnswer,
        });
        setIsCorrect(null);  // Reset correctness state
      } else {
        console.error('No questions returned from the API');
      }
    } catch (error) {
      console.error('Failed to fetch question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (isCorrect !== null) {
      const timer = setTimeout(() => {
        fetchQuestion();  // Fetch next question after delay
        setLoading(false);  // Ensure loading is reset
      }, 2000); // Delay to show feedback

      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  const handleAnswer = (option) => {
    setLoading(true); // Start loading immediately
    if (question && option === question.correctAnswer) {
      setStreak(prev => prev + 1);
      setIsCorrect(true);
    } else {
      setStreak(0);
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <h2>Streak: {streak}</h2>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : question ? (
        <>
          <p>{question.text}</p>
          {question.options && question.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)} disabled={loading}>
              {option}
            </button>
          ))}
          {isCorrect !== null && (
            <div className="feedback">
              <div className="loading-bar"></div>
              {isCorrect ? <span className="correct">Correct!</span> : <span className="wrong">Wrong!</span>}
              
            </div>
          )}
        </>
      ) : (
        <p>No question available</p>
      )}
    </div>
  );
}

export default TriviaGame;