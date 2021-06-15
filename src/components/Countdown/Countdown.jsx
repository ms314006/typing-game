import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`
  color: #FAF3E0;
  text-align: center;
  font-size: 64px;

  & > span {
    font-size: 24px;
  }
`;

const Countdown = (props) => {
  const { startCountdown, startCountdownSeconds, timeUpEvent } = props;
  const [secondsRemaining, setSecondsRemaining] = useState(startCountdownSeconds);
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      timeUpEvent();
    }
  }, [secondsRemaining]);

  useEffect(() => {
    if (startCountdown) {
      setSecondsRemaining(startCountdownSeconds);

      const ONE_MIN_SECOND = 10;
      const newTimerIntervalId = setInterval(() => {
        setSecondsRemaining((currentSecondsRemaining) => (
          (Math.round((currentSecondsRemaining - 0.01) * 100) / 100).toFixed(2)
        ));
      }, ONE_MIN_SECOND);
      setTimerIntervalId(newTimerIntervalId);
    } else {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
  }, [startCountdown]);

  return (
    <Body>
      { secondsRemaining }
      <span>sec</span>
    </Body>
  );
};

Countdown.propTypes = {
  startCountdown: PropTypes.bool.isRequired,
  startCountdownSeconds: PropTypes.number.isRequired,
  timeUpEvent: PropTypes.func.isRequired,
};

export default Countdown;
