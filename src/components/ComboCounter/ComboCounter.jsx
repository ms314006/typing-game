import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const jump = keyframes`
  0% {
    top: 0px;
  }

  50% {
    top: -20px;
  }
  
  100% {
    top: 0px;
  }
`;

const Body = styled.div`
  position: absolute;
  right: calc(50% - 360px);
  top: 160px;
  color: #EABF9F;
  font-style: italic;
  font-size: 32px;
  position: absolute;

  & > div {
    display: inline-block;
    font-size: 48px;
    color: #FAF3E0;
    margin: 0px 4px;
    position: relative;
    top: 0px;
  }
  & > .jump {
    animation: ${jump} 0.1s linear;
  }
`;

const ControlButtons = (props) => {
  const { comboCount } = props;
  const comboNumberElement = useRef();
  useEffect(() => {
    if (comboNumberElement.current) {
      console.log(comboNumberElement.current);
      const ANIMATION_TIME = 100;
      comboNumberElement.current.className = 'jump';

      setTimeout(() => {
        comboNumberElement.current.className = '';
      }, ANIMATION_TIME);
    }
  }, [comboCount]);
  return (
    comboCount > 0 ? (
      <Body>
        <div
          className="comboNumber"
          ref={comboNumberElement}
        >
          { comboCount }
        </div>
        Combo
      </Body>
    ) : null
  );
};

ControlButtons.propTypes = {
  comboCount: PropTypes.number.isRequired,
};

export default ControlButtons;
