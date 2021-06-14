import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`

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

      const ONE_SECOND = 1000;
      const newTimerIntervalId = setInterval(() => {
        setSecondsRemaining((currentSecondsRemaining) => currentSecondsRemaining - 1);
      }, ONE_SECOND);
      setTimerIntervalId(newTimerIntervalId);
    } else {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
  }, [startCountdown]);

  return (
    <Body>
      { secondsRemaining }
    </Body>
  );
};

Countdown.propTypes = {
  startCountdown: PropTypes.bool.isRequired,
  startCountdownSeconds: PropTypes.number.isRequired,
  timeUpEvent: PropTypes.func.isRequired,
};

export default Countdown;
