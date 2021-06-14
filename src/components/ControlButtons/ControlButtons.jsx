import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`

`;

const ControlButtons = (props) => {
  const { started, stopTypingGame, startTypingGame } = props;
  return (
    <Body>
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
    </Body>
  );
};

ControlButtons.propTypes = {
  started: PropTypes.bool.isRequired,
  startTypingGame: PropTypes.func.isRequired,
  stopTypingGame: PropTypes.func.isRequired,
};

export default ControlButtons;
