import React, { useState } from 'react';
import './joknepo.css'; 
import { Container } from 'postcss';


const getComputerChoice = () => {
  const choices = ['pedra', 'papel', 'tesoura'];
  return choices[Math.floor(Math.random() * choices.length)];
};


const determineWinner = (player1Choice, player2Choice) => {
  if (player1Choice === player2Choice) return 'empate';
  if (
    (player1Choice === 'pedra' && player2Choice === 'tesoura') ||
    (player1Choice === 'papel' && player2Choice === 'pedra') ||
    (player1Choice === 'tesoura' && player2Choice === 'papel')
  ) {
    return 'jogador1';
  }
  return 'jogador2';
};

const Jokenpo = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [friendChoice, setFriendChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('pc'); 
  const [score, setScore] = useState({ jogador1: 0, jogador2: 0, empate: 0 });
  const [showChoices, setShowChoices] = useState(false);

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    if (gameMode === 'pc') {
      const computerChoice = getComputerChoice();
      setComputerChoice(computerChoice);
      setShowChoices(true); 
      const result = determineWinner(choice, computerChoice);
      setWinner(result);
      updateScore(result);
    } else if (gameMode === 'amigo') {
      setFriendChoice(null);
      setShowChoices(false); 
    }
  };

  const handleFriendChoice = (choice) => {
    setFriendChoice(choice);
    setShowChoices(true); 
    const result = determineWinner(playerChoice, choice);
    setWinner(result);
    updateScore(result);
  };

  const updateScore = (result) => {
    setScore(prevScore => ({
      ...prevScore,
      [result]: prevScore[result] + 1
    }));
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setFriendChoice(null);
    setWinner(null);
    setShowChoices(false);
  };

  const choiceIcon = (choice) => {
    switch (choice) {
      case 'pedra':
        return '✊';
      case 'papel':
        return '✋';
      case 'tesoura':
        return '✌️';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h1 className='agaum'>Jogo de Pedra, Papel e Tesoura</h1>
      <div className="mode-selector">
        <button className="mode-button" onClick={() => setGameMode('pc')}>Jogar contra o PC</button>
        <button className="mode-button" onClick={() => setGameMode('amigo')}>Jogar contra um amigo</button>
      </div>

      <div className="scoreboard">
        <div className="score-item">Você: {score.jogador1}</div>
        <div className="score-item">Amigo: {score.jogador2}</div>
        <div className="score-item">Empates: {score.empate}</div>
      </div>

      {gameMode === 'pc' && (
        <div className="choice-buttons">
          <h2 className='esco'>Escolha sua jogada:</h2>
          <div className="butoenses">
          <button className="choice-button" onClick={() => handlePlayerChoice('pedra')}>Pedra</button>
          <button className="choice-button" onClick={() => handlePlayerChoice('papel')}>Papel</button>
          <button className="choice-button" onClick={() => handlePlayerChoice('tesoura')}>Tesoura</button>
          </div>
        </div>
      )}

      {gameMode === 'amigo' && friendChoice === null && playerChoice === null && (
        <div className="choice-info">
          <h2>Jogador 1: Escolha sua jogada:</h2>
          <div className="choice-buttons">
            <button className="choice-button" onClick={() => handlePlayerChoice('pedra')}>Pedra</button>
            <button className="choice-button" onClick={() => handlePlayerChoice('papel')}>Papel</button>
            <button className="choice-button" onClick={() => handlePlayerChoice('tesoura')}>Tesoura</button>
          </div>
        </div>
      )}

      {gameMode === 'amigo' && playerChoice && friendChoice === null && (
        <div className="choice-info">
          <h2>Amigo, escolha sua jogada:</h2>
          <div className="choice-buttons">
            <button className="choice-button" onClick={() => handleFriendChoice('pedra')}>Pedra</button>
            <button className="choice-button" onClick={() => handleFriendChoice('papel')}>Papel</button>
            <button className="choice-button" onClick={() => handleFriendChoice('tesoura')}>Tesoura</button>
          </div>
        </div>
      )}

      {showChoices && (
        <div className="result-info">
          <h2>Você escolheu: {choiceIcon(playerChoice)}</h2>
          {gameMode === 'pc' && computerChoice && <h2>O PC escolheu: {choiceIcon(computerChoice)}</h2>}
          {gameMode === 'amigo' && friendChoice && <h2>O amigo escolheu: {choiceIcon(friendChoice)}</h2>}
        </div>
      )}

      {winner && (
        <div className="result-info">
          <h2>Resultado: {winner === 'empate' ? 'Empate!' : `Vencedor: ${winner === 'jogador1' ? 'Você' : 'Amigo'}`}</h2>
          <button className="reset-button" onClick={resetGame}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
};

export default Jokenpo;
