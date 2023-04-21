import React from 'react';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { bodyContainer } from '../styles/Mixin';

const Text = styled.div`
  font-size: 1.2rem;
  font-family: ${fontAll.main};

  a {
    padding: 0 2px;
    margin: 0 5px;
    &:hover {
      color: ${colorAll.back};
      background-color: ${colorAll.main};
    }
  }
`;

const FOOTER = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  ${bodyContainer}
  min-height: 200px;
`;

function Footer() {
  return (
    <FOOTER>
      <Text>
        Created by <a href={'https://blog.diveindeep.space/'}>diveindeep</a>
      </Text>
    </FOOTER>
  );
}

export default Footer;
