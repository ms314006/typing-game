import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Letter from '../../components/Letter';
import ControlButtons from '../../components/ControlButtons';
import Countdown from '../../components/Countdown';
import TypingGame from '../../classes/TypingGame';
import English from '../../classes/English';

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: 'Nanum Gothic', sans-serif;
`;

const Main = (props) => {
  const { typingGame } = props;
  const [started, setStarted] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('');

  const startTypingGame = () => {
    typingGame.start();
    setStarted(typingGame.getTypingGameStarted());

    typingGame.setNewCurrentLetter(English.getRandomLetter());
    setCurrentLetter(typingGame.getCurrentLetter());
  };

  const stopTypingGame = () => {
    typingGame.stop();
    setStarted(typingGame.getTypingGameStarted());
    setCurrentLetter(typingGame.getCurrentLetter());
  };

  useEffect(() => {
    const handleTypingEvent = (e) => {
      const keyDownLetter = e.key.toUpperCase();
      const correct = typingGame.checkIsLetterCorrect(keyDownLetter);
      if (correct) {
        typingGame.setNewCurrentLetter(English.getRandomLetter());
        setCurrentLetter(typingGame.getCurrentLetter());
      }
    };

    if (started) {
      window.addEventListener('keydown', handleTypingEvent);
    } else {
      window.removeEventListener('keydown', handleTypingEvent);
    }
  }, [started]);

  return (
    <Body>
      <Letter letter={currentLetter} />
      <ControlButtons
        started={started}
        startTypingGame={startTypingGame}
        stopTypingGame={stopTypingGame}
      />
      <Countdown
        startCountdown={started}
        startCountdownSeconds={10}
        timeUpEvent={stopTypingGame}
      />
    </Body>
  );
};

Main.propTypes = {
  typingGame: PropTypes.shape({
    start: PropTypes.func,
    stop: PropTypes.func,
    getTypingGameStarted: PropTypes.func,
    setNewCurrentLetter: PropTypes.func,
    getCurrentLetter: PropTypes.func,
    checkIsLetterCorrect: PropTypes.func,
  }).isRequired,
};

const typingGame = new TypingGame();
export default () => <Main typingGame={typingGame} />;
