import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`

`;

const Letter = ({ letter }) => (
  <Body>
    { letter }
  </Body>
);

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default Letter;
