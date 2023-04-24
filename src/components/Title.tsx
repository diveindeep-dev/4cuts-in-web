import Mockup from './frame/Mockup';
import styled from 'styled-components';
import { colorAll } from '../styles/Variables';

interface TitleProps {
  title: string;
  type: string;
}

const H1 = styled.h1`
  font-size: 3.3rem;
  font-weight: 100;
`;

const Pic = styled.div`
  align-self: center;
  border: 2px solid ${colorAll.main};
  opacity: 0.2;
  transform: rotate(-25deg);
`;

const TITLE = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 220px;
  padding: 20px;
`;

function Title({ title, type }: TitleProps) {
  return (
    <TITLE>
      <H1>{title}</H1>
      <Pic>
        <Mockup type={type} />
      </Pic>
    </TITLE>
  );
}

export default Title;
