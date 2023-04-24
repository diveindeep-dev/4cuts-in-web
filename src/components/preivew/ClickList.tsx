import styled from 'styled-components';
import Preview from '.';

interface FullListProps {
  type: string;
  srcs: string[];
  handleClick: (src: string) => void;
}

const List = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  padding-left: 20px;
  align-content: start;

  &.click-basic {
    > img {
      width: 100%;
    }
  }

  &.click-wide {
    & img {
      height: 200px;
    }
  }
`;

function ClickList(props: FullListProps) {
  const { type, srcs, handleClick } = props;

  return (
    <List className={`click-${type}`}>
      {srcs.map((src: string, i: number) => {
        return (
          <Preview
            key={i}
            index={i}
            src={src}
            type={type}
            handleClick={() => handleClick(src)}
          />
        );
      })}
    </List>
  );
}

export default ClickList;
