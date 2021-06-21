import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`
  border-radius: 4px;
  color: #FAF3E0;
  position: absolute;
  right: calc(50% - 360px);
  top: 240px;
`;

const Title = styled.div`
  font-size: 24px;
  margin: 8px 0px;
`;

const LetterWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 82px;
  border: 2px #FAF3E0 solid;
  border-radius: 4px;
  width: 120px;
  height: 120px;
`;

const NextLetter = ({ letter }) => (
  <Body>
    <Title>
      Next Letter
    </Title>
    <LetterWrap>
      { letter || '?' }
    </LetterWrap>
  </Body>
);

NextLetter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default NextLetter;
