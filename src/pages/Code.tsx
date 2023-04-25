import { ChangeEvent, KeyboardEvent, useState } from 'react';
import codeList from '../assets/code';
import Title from '../components/Title';
import CustomBooth from './CustomBooth';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { bodyContainer, flexCenter } from '../styles/Mixin';

const Button = styled.button`
  font-size: 4rem;
  color: ${colorAll.line};
  &:hover {
    color: ${colorAll.main};
  }
`;

const Input = styled.input`
  border-bottom: 2px solid ${colorAll.line};
  font-size: 5rem;
  font-family: ${fontAll.body};
  font-weight: 100;
  text-align: center;
`;

const InputWrap = styled.div`
  display: flex;
`;

const Error = styled.div`
  padding-top: 20px;
  height: 100px;
  font-size: 3rem;
  font-weight: 100;
`;

const InputCode = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  background-color: ${colorAll.back};
  border-left: 1px solid ${colorAll.line};
  z-index: 1;
`;

const CODE = styled.div`
  ${bodyContainer}
  display: flex;
  min-height: 868px;
  font-family: ${fontAll.body};
`;

function Code() {
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState('');
  const [custom, setCustom] = useState<Custom | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setQuery(e.target.value);
  };

  const handleClick = () => {
    if (!query) return setError('Enter the code.');

    const isCode = codeList.hasOwnProperty(query);
    if (isCode) {
      setCustom(codeList[query]);
    } else {
      setCustom(null);
      setError('Please check the code.');
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <>
      {!custom ? (
        <CODE>
          <Title title={'Special Code'} type={'code'} />
          <InputCode>
            <InputWrap>
              <Input
                type="text"
                onChange={handleChange}
                onKeyDown={handleKey}
              />
              <Button onClick={handleClick}>↲</Button>
            </InputWrap>
            <Error>{error}</Error>
          </InputCode>
        </CODE>
      ) : (
        <CustomBooth custom={custom} />
      )}
    </>
  );
}

export default Code;
