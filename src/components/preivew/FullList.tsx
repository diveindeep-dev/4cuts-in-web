import styled from 'styled-components';
import Preview from '.';
import { aspectRatio } from '../../styles/Frame';
import { colorAll } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';

interface FullListProps {
  type: string;
  srcs: string[];
  blanks: number[];
}

interface StyleProps {
  type: string;
}

const Blank = styled.div<StyleProps>`
  ${flexCenter}
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
  border: 1px solid ${colorAll.line};
  font-size: 1.3rem;
`;

const List = styled.div`
  display: grid;
  grid-gap: 10px;
  place-items: center;

  &.list-basic {
    padding: 20px 10px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    & > div,
    img {
      width: 100%;
    }
  }

  &.list-wide {
    padding: 0 50px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    & > div,
    img {
      height: 190px;
    }
  }
`;

function FullList(props: FullListProps) {
  const { type, srcs, blanks } = props;

  return (
    <List className={`list-${type}`}>
      {srcs.map((src: string, i: number) => {
        return <Preview key={i} index={i} src={src} type={type} />;
      })}
      {blanks.map((blank: number, i: number) => {
        return <Blank key={i} type={type}>{`TAKE ${blank}`}</Blank>;
      })}
    </List>
  );
}

export default FullList;
