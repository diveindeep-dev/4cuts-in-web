import Tag from './Tag';
import styled from 'styled-components';
import { frameRatio, aspectRatio } from '../../styles/Frame';
import { colorAll, fontAll } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';

interface FrameProps {
  type: string;
  selected: any;
  handleClick: (position: string) => void;
  positions: string[];
  currentPosition: string;
  color: string;
}

interface StyleProps {
  type: string;
  isCurrent?: boolean;
  color?: string;
}

const NotSelect = styled.div`
  font-size: 1.2rem;
  font-family: ${fontAll.body};
  font-weight: 100;
`;

const IMG = styled.img<StyleProps>`
  width: 100%;
  height: 100%;
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
`;

const Photo = styled.div<StyleProps>`
  ${flexCenter}
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
  background-color: ${colorAll.backSub};
  border: ${({ isCurrent }) => isCurrent && `2px solid ${colorAll.white}`};
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  &.basic {
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }

  &.wide {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FRAME = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  padding: 15px 15px 0 15px;
  aspect-ratio: ${({ type }) => frameRatio[`${type}`]};
  background-color: ${({ color }) => color};
  overflow: hidden;
`;

function Frame(props: FrameProps) {
  const { type, selected, handleClick, positions, currentPosition, color } =
    props;

  return (
    <FRAME type={type} color={color}>
      <Container>
        <PhotoGrid className={type}>
          {positions.map((position: string, i: number) => {
            return (
              <Photo
                key={i}
                type={type}
                onClick={() => handleClick(position)}
                isCurrent={currentPosition === position}
              >
                {selected[`${position}`] ? (
                  <IMG
                    src={selected[`${position}`]}
                    alt={`${position}`}
                    type={type}
                  />
                ) : (
                  <NotSelect>Pick Photo</NotSelect>
                )}
              </Photo>
            );
          })}
        </PhotoGrid>
        <Tag />
      </Container>
    </FRAME>
  );
}

export default Frame;
