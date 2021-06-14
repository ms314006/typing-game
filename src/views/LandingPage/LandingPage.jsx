import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TypingGame from '../../classes/TypingGame';

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: 'Nanum Gothic', sans-serif;
`;

const Main = (props) => {
  const { typingGame } = props;
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [started, setStarted] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(null);

  const getRandomEnglishLetter = () => {
    const ENGLISH_LETTER_COUNT = 26;
    const newEnglishLetterAsciiCode = Math.floor(Math.random() * ENGLISH_LETTER_COUNT) + 1 + 64;
    return String.fromCharCode(newEnglishLetterAsciiCode);
  };

  const startTypingGame = () => {
    typingGame.start();
    setStarted(typingGame.getTypingGameStarted());

    typingGame.setNewCurrentLetter(getRandomEnglishLetter());
    setCurrentLetter(typingGame.getCurrentLetter());

    setSecondsRemaining(10);
  };

  const stopTypingGame = () => {
    typingGame.stop();
    setStarted(typingGame.getTypingGameStarted());
    setCurrentLetter(typingGame.getCurrentLetter());
  };

  useEffect(() => {
    if (secondsRemaining <= 0) {
      stopTypingGame();
    }
  }, [secondsRemaining]);

  useEffect(() => {
    if (started) {
      const ONE_SECOND = 1000;
      const newTimerIntervalId = setInterval(() => {
        setSecondsRemaining((currentSecondsRemaining) => currentSecondsRemaining - 1);
      }, ONE_SECOND);
      setTimerIntervalId(newTimerIntervalId);
    } else {
      clearInterval(timerIntervalId);
    }
  }, [started]);

  useEffect(() => {
    const handleTypingEvent = (e) => {
      const keyDownLetter = e.key.toUpperCase();
      const correct = typingGame.checkIsLetterCorrect(keyDownLetter);
      if (correct) {
        typingGame.setNewCurrentLetter(getRandomEnglishLetter());
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
      <div>
        { currentLetter }
      </div>
      <div>
        {
          started ? (
            <button type="button" onClick={stopTypingGame}>
              Stop
            </button>
          ) : (
            <button type="button" onClick={startTypingGame}>
              Start
            </button>
          )
        }
      </div>
      <div>
        { secondsRemaining }
      </div>
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
