import styled from 'styled-components';
import { aspectRatio } from '../../styles/Frame';

interface PreviewProps {
  type: string;
  src: string;
  index: number;
  handleClick?: any;
}

interface StyleProps {
  type: string;
}

const IMG = styled.img<StyleProps>`
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
`;

function Preview({ type, src, index, handleClick }: PreviewProps) {
  return (
    <IMG
      type={type}
      src={src}
      alt={`preview${index + 1}`}
      onClick={handleClick}
    />
  );
}

export default Preview;
