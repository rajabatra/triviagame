import { useState } from "react";
import "./App.css";
import TriviaGame from './TriviaGame.jsx';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Modal = ({ onClose }) => (
    <div className="modal">
      <div className="modal-content">
        <h2>How to Play</h2>
        <p>This is a trivia game where you answer questions to score points. Click 'Play' to start the game! The site was built in react by Raja Batra and Amelia Opsahl and uses the 'the-trivia-api' to generate questions.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Game</h1>
      </header>
      <main>
        {gameStarted ? (
          <TriviaGame />
        ) : (
          <>
            <button onClick={() => setGameStarted(true)} className="play-button">
              Play
            </button>
            <button onClick={() => setIsModalOpen(true)} className="question-button">
              How to Play?
            </button>
          </>
        )}
        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      </main>
    </div>
  );
}

export default App;