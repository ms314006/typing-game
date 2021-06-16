import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TYPING_GAME_MAX_COMBO_RECORDS, TYPING_GAME_SCORE_RECORDS } from '../../constant/localStorageKey';

const Body = styled.div`
  position: absolute;
  width: 360px;
  height: 600px;
  background: #000000aa;
  border-radius: 4px;
  border: 4px #FAF3E0 solid;
  top: calc(50% - 360px);
  right: calc(50% - 180px);
  z-index: 2;
  color: #FAF3E0;
`;

const Result = styled.div`
  margin: 50px auto;
  width: 240px;
  font-size: 32px;

  & > div {
    margin-bottom: 16px;
  }
`;

const Records = styled.div`
  text-align: center;
  font-size: 20px;

  & > h1 {
    margin-bottom: 8px;
    font-size: 28px;
  }
`;

const Record = styled.div`
  padding: 4px 8px;
  text-align: left;
`;

const ControlButtons = (props) => {
  const DISPLAY_RECORD_COUNT = 5;
  const { maxComboCount, score } = props;
  const maxComboRecords = JSON.parse(localStorage.getItem(TYPING_GAME_MAX_COMBO_RECORDS) || '[]');
  const scoreRecords = JSON.parse(localStorage.getItem(TYPING_GAME_SCORE_RECORDS) || '[]');
  return (
    <Body>
      <Result>
        <div>{`Score: ${score}`}</div>
        <div>{`Max Combo: ${maxComboCount}`}</div>
        <hr />
        <Records>
          <h1>Score Record</h1>
          {
            scoreRecords.map((scoreRecord, index) => (
              <Record>{`${index + 1}. ${scoreRecord}`}</Record>
            ))
          }
          {
            Array.from(new Array(DISPLAY_RECORD_COUNT - scoreRecords.length))
              .map((_v, index) => (
                <Record>{`${index + scoreRecords.length + 1}. ...`}</Record>
              ))
          }
        </Records>
        <Records>
          <h1>Max Combo Record</h1>
          {
            maxComboRecords.map((maxCombo, index) => (
              <Record>{`${index + 1}. ${maxCombo}`}</Record>
            ))
          }
          {
            Array.from(new Array(DISPLAY_RECORD_COUNT - maxComboRecords.length))
              .map((_v, index) => (
                <Record>{`${index + maxComboRecords.length + 1}. ...`}</Record>
              ))
          }
        </Records>
      </Result>
    </Body>
  );
};

ControlButtons.propTypes = {
  maxComboCount: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default ControlButtons;
