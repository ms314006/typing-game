import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 384px;
  color: #EABF9F;
  opacity: ${({ letterIsHide }) => (letterIsHide ? 0 : 1)};
`;

const Letter = ({ letter, letterIsHide }) => (
  <Body letterIsHide={letterIsHide}>
    { letter || '?' }
  </Body>
);

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  letterIsHide: PropTypes.bool.isRequired,
};

export default Letter;
