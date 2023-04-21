import React from 'react';
import styled from 'styled-components';
import { fontAll } from '../styles/Variables';
import { bodyContainer } from '../styles/Mixin';

const Title = styled.div`
  font-size: 1.5rem;
  font-family: ${fontAll.main};
  font-weight: 900;
`;

const HEADER = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  ${bodyContainer}
  height: 100px;
`;

function Header() {
  return (
    <HEADER>
      <Title>4CUTS IN WEB</Title>
    </HEADER>
  );
}

export default Header;
