import Mockup from './frame/Mockup';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';

interface TitleProps {
  title: string;
  type: string;
}

const H1 = styled.h1`
  font-size: 3.3rem;
  font-weight: 100;
`;

const MockupCode = styled.div`
  height: 500px;
  font-size: 8rem;
  font-family: ${fontAll.body};
  font-weight: 400;
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
  width: 220px;
  padding: 20px;

  &.title-code {
    ${Pic} {
      transform: translate(30px);
      border: none;
    }
  }
`;

function Title({ title, type }: TitleProps) {
  const pic = () => {
    switch (type) {
      case 'code':
        return <MockupCode>****</MockupCode>;
      case 'custom':
        return;
      default:
        return <Mockup type={type} />;
    }
  };

  return (
    <TITLE className={`title-${type}`}>
      <H1>{title}</H1>
      <Pic>{pic()}</Pic>
    </TITLE>
  );
}

export default Title;
