import today from '../../utils/date';
import logo from '../../assets/logo.png';
import styled from 'styled-components';
import { fontAll } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';

const Title = styled.div`
  padding-bottom: 5px;
  font-size: 1.2rem;
  font-family: ${fontAll.main};
`;

const Date = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`;

const IMG = styled.img`
  position: absolute;
  width: 33%;
  right: -3%;
  bottom: -4.2%;
  z-index: 10;
  transform: rotate(-15deg);
`;

const TextContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

const TAG = styled.div`
  ${flexCenter}
  height: 100%;
  color: white;
`;

function Tag() {
  return (
    <TAG>
      <TextContainer>
        <Title>4CUTS IN WEB</Title>
        <Date>{today()}</Date>
      </TextContainer>
      <IMG src={logo} alt="logo" />
    </TAG>
  );
}

export default Tag;
