import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Letter from '../../components/Letter';
import ControlButtons from '../../components/ControlButtons';
import Countdown from '../../components/Countdown';
import ComboCounter from '../../components/ComboCounter';
import TypingGame from '../../classes/TypingGame';
import English from '../../classes/English';

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: 'Nanum Gothic', sans-serif;
  background: #1E212D;
  position: relative;
`;

const GameWindowWrap = styled.div`
  padding: 20px;
  box-sizing: border-box;
  margin: 0px auto;
  width: 700px;
  height: 100vh;
  display: grid;
  grid-template-rows: 100px 60% auto;
`;

const Letters = styled.div`
  position: relative;

  & > div {
    position: absolute;
    top: calc(50% - 180px);
  }
`;

const Main = (props) => {
  const { typingGame } = props;
  const [comboCount, setComboCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [letters, setLetters] = useState([
    { letter: '', letterIsHide: false },
    { letter: '', letterIsHide: true },
  ]);

  const startTypingGame = () => {
    typingGame.start();
    setStarted(typingGame.getTypingGameStarted());

    typingGame.setNewCurrentLetter(English.getRandomLetter());
    setLetters([
      { letter: typingGame.getCurrentLetter(), letterIsHide: false },
      letters[1],
    ]);
  };

  const stopTypingGame = () => {
    typingGame.stop();
    setStarted(typingGame.getTypingGameStarted());
    setLetters([
      { letter: typingGame.getCurrentLetter(), letterIsHide: false },
      { letter: typingGame.getCurrentLetter(), letterIsHide: true },
    ]);
  };

  useEffect(() => {
    const checkTypingKeyIsCorrect = (e) => {
      const keyDownLetter = e.key.toUpperCase();
      const correct = typingGame.checkIsLetterCorrect(keyDownLetter);
      if (correct) {
        typingGame.setNewCurrentLetter(English.getRandomLetter());
        setLetters((currentLetters) => ([
          {
            letter: !currentLetters[0].letterIsHide
              ? currentLetters[0].letter
              : typingGame.getCurrentLetter(),
            letterIsHide: !currentLetters[0].letterIsHide,
          },
          {
            letter: !currentLetters[1].letterIsHide
              ? currentLetters[1].letter
              : typingGame.getCurrentLetter(),
            letterIsHide: !currentLetters[1].letterIsHide,
          },
        ]));
        setComboCount((currentComboCount) => currentComboCount + 1);
      } else {
        setComboCount(0);
      }
    };
    window.addEventListener('keydown', checkTypingKeyIsCorrect);
  }, []);

  return (
    <Body>
      <ComboCounter comboCount={comboCount} />
      <GameWindowWrap>
        <Countdown
          startCountdown={started}
          startCountdownSeconds={10}
          timeUpEvent={stopTypingGame}
        />
        <Letters>
          <Letter letter={letters[0].letter} letterIsHide={letters[0].letterIsHide} />
          <Letter letter={letters[1].letter} letterIsHide={letters[1].letterIsHide} />
        </Letters>
        <ControlButtons
          started={started}
          startTypingGame={startTypingGame}
          stopTypingGame={stopTypingGame}
        />
      </GameWindowWrap>
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
