import styled from 'styled-components';
import { aspectRatio } from '../../styles/Frame';
import { colorAll } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';

interface PreviewsProps {
  type: string;
  srcs: string[];
  handleClick?: (src: string) => void;
}

interface StyleProps {
  type: string;
}

const Blank = styled.div<StyleProps>`
  ${flexCenter}
  height: 100%;
  font-size: 1.3rem;
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
  border: 1px solid ${colorAll.line};
`;

const PreviewImg = styled.img``;

const PREVIEWS = styled.div`
  display: grid;
  grid-gap: 10px;

  &.list-basic,
  &.list-custom {
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

  &.set {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
    align-content: start;
    padding: 0 0 0 20px;
    & > div {
      min-height: 135.43px;
    }
  }
`;

function Previews(props: PreviewsProps) {
  const { type, srcs, handleClick } = props;
  const blanks = [1, 2, 3, 4, 5, 6, 7, 8].slice(srcs.length);
  const canClick = handleClick !== undefined;

  const preview = srcs.map((src: string, i: number) => {
    return (
      <PreviewImg
        key={i}
        src={src}
        alt={`preview${i + 1}`}
        onClick={canClick ? () => handleClick(src) : undefined}
      />
    );
  });

  const blankBox = blanks.map((num: number, i: number) => {
    return <Blank key={i} type={type}>{`TAKE ${num}`}</Blank>;
  });

  return (
    <PREVIEWS className={`list-${type}`}>
      {preview}
      {blankBox}
    </PREVIEWS>
  );
}

export default Previews;
