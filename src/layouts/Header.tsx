import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fontAll } from '../styles/Variables';
import { bodyContainer, flexCenter } from '../styles/Mixin';

const Title = styled(Link)`
  font-size: 1.5rem;
  font-family: ${fontAll.main};
  font-weight: 900;
`;

const HEADER = styled.header`
  ${flexCenter}
  ${bodyContainer}
  height: 100px;
`;

function Header() {
  return (
    <HEADER>
      <Title to={'/'}>4CUTS IN WEB</Title>
    </HEADER>
  );
}

export default Header;
