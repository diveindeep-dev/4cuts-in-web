import Tag from './Tag';
import styled from 'styled-components';
import { aspectRatio, frameOrders, frameRatio } from '../../styles/Frame';
import { colorAll, fontAll } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';

interface FrameProps {
  type: string;
  selected: any;
  handlePosition: (order: string) => void;
  currentOrder: string;
  folder?: string;
  color: string;
  title?: string;
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

const FramePic = styled.img`
  position: absolute;
  height: 100%;
`;

const IMG = styled.img<StyleProps>`
  width: 100%;
  height: 100%;
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
`;

const GridPosition = styled.div<StyleProps>`
  position: relative;
  ${flexCenter}
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
  background-color: ${colorAll.line};
  border: ${({ isCurrent }) => isCurrent && `2px solid ${colorAll.white}`};
`;

const FrameGrid = styled.div`
  display: grid;
  grid-gap: 15px;

  &.basic,
  &.special {
    grid-template-rows: repeat(4, 1fr);
  }

  &.wide {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Out = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 15px 15px 0 15px;
  aspect-ratio: ${({ type }) => frameRatio[`${type}`]};
  background-color: ${({ color }) => color};
  overflow: hidden;
`;

function Frame(props: FrameProps) {
  const { type, color, selected, handlePosition, currentOrder, folder, title } =
    props;

  const framePositions = frameOrders.map((order: string, i: number) => {
    const orderIndex = frameOrders.indexOf(order);
    const isSelectedImg = selected[order];

    return (
      <GridPosition
        key={i}
        type={type}
        onClick={() => handlePosition(order)}
        isCurrent={currentOrder === order}
      >
        {type === 'custom' && (
          <FramePic
            src={require(`../../assets/${folder}/${orderIndex}.png`)}
            alt="frame"
          />
        )}
        {isSelectedImg ? (
          <IMG src={isSelectedImg} alt={`${order}`} type={type} />
        ) : (
          <NotSelect>Pick Photo</NotSelect>
        )}
      </GridPosition>
    );
  });

  return (
    <Out type={type} color={color}>
      <Container>
        <FrameGrid className={type}>{framePositions}</FrameGrid>
        <Tag title={title} />
      </Container>
    </Out>
  );
}

export default Frame;
