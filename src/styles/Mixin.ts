import styled, { css } from 'styled-components';
import { colorAll } from './Variables';

export const bodyContainer = css`
  width: 1280px;
  margin: 0 auto;
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Shutter = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${colorAll.back};
  box-shadow: ${colorAll.dark} 0px 0px 0px 2px, ${colorAll.back} 0px 0px 0px 2px,
    ${colorAll.dark} 0px 0px 0px 3px, ${colorAll.back} 0px 0px 0px 10px;
  &:hover {
    width: 44px;
    height: 44px;
    box-shadow: ${colorAll.dark} 0px 0px 0px 2px,
      ${colorAll.back} 0px 0px 0px 2px, ${colorAll.dark} 0px 0px 0px 6px,
      ${colorAll.back} 0px 0px 0px 13px;
    transition: all 0.1s ease-in-out;
  }
`;

export const SideButton = styled.div`
  display: flex;
  color: ${colorAll.main};
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
    font-weight: 400;
    background-color: ${colorAll.backTrans};
  }
`;
