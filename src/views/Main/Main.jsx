import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Letter from '../../components/Letter';
import ControlButtons from '../../components/ControlButtons';
import Countdown from '../../components/Countdown';
import ComboCounter from '../../components/ComboCounter';
import NextLetter from '../../components/NextLetter';
import Result from '../../components/Result';
import TypingGame from '../../classes/TypingGame';
import English from '../../classes/English';
import { TYPING_GAME_MAX_COMBO_RECORDS, TYPING_GAME_SCORE_RECORDS } from '../../constant/localStorageKey';

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

const getTopFiveHighNum = (array) => {
  const topFiveHighNums = [...array];
  topFiveHighNums.sort((a, b) => b - a);
  while (topFiveHighNums.length > 5) {
    topFiveHighNums.pop();
  }
  return topFiveHighNums;
};

const Main = (props) => {
  const { typingGame } = props;
  const [comboCount, setComboCount] = useState(0);
  const [maxComboCount, setMaxComboCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [letters, setLetters] = useState([
    { letter: '', letterIsHide: false },
    { letter: '', letterIsHide: true },
  ]);

  const getNextLetter = () => {
    const nextLetter = letters.find(({ letterIsHide }) => letterIsHide);
    return nextLetter.letter;
  };

  const startTypingGame = () => {
    typingGame.start();
    setStarted(typingGame.getTypingGameStarted());

    typingGame.addNewCurrentLetterToQueue(English.getRandomLetter());
    typingGame.addNewCurrentLetterToQueue(English.getRandomLetter());
    setLetters([
      { letter: typingGame.getCurrentLetter(), letterIsHide: false },
      { letter: typingGame.getNextLetter(), letterIsHide: true },
    ]);
    setShowResult(false);
    setComboCount(0);
    setMaxComboCount(0);
    setScore(0);
  };

  const stopTypingGame = () => {
    typingGame.stop();
    setStarted(typingGame.getTypingGameStarted());
    setLetters([
      { letter: typingGame.getCurrentLetter(), letterIsHide: false },
      { letter: typingGame.getCurrentLetter(), letterIsHide: true },
    ]);
    const newMaxComboCount = Math.max(maxComboCount, comboCount);
    setMaxComboCount(newMaxComboCount);
    const maxComboRecords = JSON.parse(localStorage.getItem(TYPING_GAME_MAX_COMBO_RECORDS) || '[]');
    const scoreRecords = JSON.parse(localStorage.getItem(TYPING_GAME_SCORE_RECORDS) || '[]');
    localStorage.setItem(
      TYPING_GAME_MAX_COMBO_RECORDS,
      JSON.stringify(getTopFiveHighNum([...maxComboRecords, newMaxComboCount])),
    );
    localStorage.setItem(
      TYPING_GAME_SCORE_RECORDS,
      JSON.stringify(getTopFiveHighNum([...scoreRecords, score])),
    );
    setShowResult(true);
  };
  const checkTypingKeyIsCorrect = (e) => {
    const keyDownLetter = e.key.toUpperCase();
    const correct = typingGame.checkIsLetterCorrect(keyDownLetter);
    if (correct) {
      typingGame.addNewCurrentLetterToQueue(English.getRandomLetter());
      setLetters((currentLetters) => ([
        {
          letter: !currentLetters[0].letterIsHide
            ? typingGame.getNextLetter()
            : typingGame.getCurrentLetter(),
          letterIsHide: !currentLetters[0].letterIsHide,
        },
        {
          letter: !currentLetters[1].letterIsHide
            ? typingGame.getNextLetter()
            : typingGame.getCurrentLetter(),
          letterIsHide: !currentLetters[1].letterIsHide,
        },
      ]));
      setComboCount((currentComboCount) => currentComboCount + 1);
      setScore((currentScore) => currentScore + 1);
    } else {
      setComboCount((currentComboCount) => {
        setMaxComboCount(
          (currentMaxComboCount) => Math.max(currentMaxComboCount, currentComboCount),
        );
        return 0;
      });
    }
  };

  const handleTypingEvent = (e) => {
    const SPACE = 'Space';
    if (e.code === SPACE) {
      startTypingGame();
    } else {
      checkTypingKeyIsCorrect(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleTypingEvent);
  }, []);

  return (
    <Body>
      <ComboCounter comboCount={comboCount} />
      <NextLetter letter={getNextLetter()} />
      {
        showResult ? (
          <Result
            score={score}
            maxComboCount={maxComboCount}
          />
        ) : null
      }
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
    addNewCurrentLetterToQueue: PropTypes.func,
    getCurrentLetter: PropTypes.func,
    getNextLetter: PropTypes.func,
    checkIsLetterCorrect: PropTypes.func,
  }).isRequired,
};

const typingGame = new TypingGame();
export default () => <Main typingGame={typingGame} />;
