import React from 'react';
import Mockup from '../components/frame/Mockup';
import styled from 'styled-components';
import { bodyContainer } from '../styles/Mixin';
import { colorAll, fontAll } from '../styles/Variables';
import { Link } from 'react-router-dom';

interface StyleProps {
  rotate?: number;
  trans?: number;
}

const Code = styled.div`
  height: 500px;
  color: ${colorAll.line};
  font-weight: 100;
  font-size: 10rem;
  font-family: ${fontAll.body};
  transform: translate(60px);
`;

const Pic = styled.div<StyleProps>`
  align-self: center;
  border: 2px solid ${colorAll.main};
  opacity: 0.2;
  ${({ rotate }) => rotate && `transform: rotate(${rotate}deg)`};
  ${({ trans }) => trans && `transform: translate(${trans}px)`};
`;

const Sub = styled.h2`
  font-size: 3.3rem;
  font-family: ${fontAll.body};
  font-weight: 100;
`;

const H1 = styled.h1`
  font-size: 6rem;
  font-family: ${fontAll.main};
`;

const LINK = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-left: 1px solid ${colorAll.line};
  overflow: hidden;

  &:hover {
    cursor: pointer;
    color: ${colorAll.white};
    background-color: ${colorAll.main};
    transition: background-color 0.5s ease-in-out;

    ${Code} {
      font-weight: 400;
    }
    ${Pic} {
      background-color: ${colorAll.back};
      opacity: 1;
      div > div {
        background-color: ${colorAll.main};
      }
    }
  }
`;

const Title = styled.div`
  padding: 20px;
`;

const Div = styled.div`
  ${bodyContainer}
  min-height: 868px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

function Index() {
  return (
    <Div>
      <Title>
        <H1>
          4CUTS
          <br />
          IN
          <br />
          WEB
        </H1>
      </Title>
      <LINK to={`/code`}>
        <Sub>Special Code</Sub>
        <Code>****</Code>
      </LINK>
      <LINK to={`/photobooth`} state={{ frame: 'basic' }}>
        <Sub>Basic</Sub>
        <Pic rotate={25}>
          <Mockup type={'basic'} />
        </Pic>
      </LINK>
      <LINK to={`/photobooth`} state={{ frame: 'wide' }}>
        <Sub>Wide</Sub>
        <Pic trans={100}>
          <Mockup type={'wide'} />
        </Pic>
      </LINK>
    </Div>
  );
}

export default Index;
