import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Button = styled.button`
  color: #EABF9F;
  background: transparent;
  border: 2px solid #EABF9F;
  font-size: 48px;
  border-radius: 12px;
  width: 300px;
  height: 80px;

  &:hover {
    color: #1E212D;
    background: #EABF9F;
    border: 2px solid #EABF9F;
  }
`;

const ControlButtons = (props) => {
  const { started, stopTypingGame, startTypingGame } = props;
  return (
    <Body>
      {
        started ? (
          <Button onClick={stopTypingGame}>
            Stop
          </Button>
        ) : (
          <Button onClick={startTypingGame}>
            Start
          </Button>
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
