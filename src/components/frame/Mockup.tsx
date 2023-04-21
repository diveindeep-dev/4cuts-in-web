import React from 'react';
import styled from 'styled-components';
import { colorAll } from '../../styles/Variables';

interface MockupProps {
  type: string;
}

const Photo = styled.div`
  border: 1px solid ${colorAll.main};
`;

const MOCKUP = styled.div`
  height: 600px;
  display: grid;
  grid-gap: 15px;
  padding: 15px;

  &.basic {
    width: 200px;
    grid-template-rows: 1fr 1fr 1fr 1fr 0.7fr;
  }

  &.wide {
    width: 400px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 0.3fr;
  }
`;

function Mockup({ type }: MockupProps) {
  return (
    <MOCKUP className={type}>
      <Photo />
      <Photo />
      <Photo />
      <Photo />
    </MOCKUP>
  );
}

export default Mockup;
