import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Camera from '../components/Camera';
import PreviewFullList from '../components/preivew/FullList';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { bodyContainer, flexCenter } from '../styles/Mixin';

const Notice = styled.div`
  ${flexCenter}
  height: 100%;
  text-align: center;
  font-size: 1.1rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  font-weight: 100;
`;

const Booth = styled.div`
  display: flex;
  border-left: 1px solid ${colorAll.line};
  border-right: 1px solid ${colorAll.line};
  background-color: ${colorAll.back};
  z-index: 1;
`;

const Next = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  div {
    font-size: 1.3rem;
    color: ${colorAll.line};
  }
`;

const Grid = styled.div`
  ${bodyContainer}
  display: grid;
  min-height: 868px;
  font-family: ${fontAll.body};
  grid-template-columns: 1fr 2.5fr 0.5fr;

  &.basic {
    ${Booth} {
      flex-direction: column;
    }
  }
`;

function PhotoBooth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const frameType: string = title.toLowerCase();
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const [blank, setBlank] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

  useEffect(() => {
    if (!location.state) {
      return navigate('/');
    } else {
      const frame: string = location.state.frame || 'Basic';
      setTitle(frame);
    }
  }, []);

  const capture = useCallback(
    (ref: MutableRefObject<any>) => {
      if (imgSrcs.length >= 8) return;

      const imageSrc = ref.current.getScreenshot();
      setImgSrcs((prev) => [...prev, imageSrc]);
      setBlank((prev) => prev.filter((_, i) => i !== 0));
    },
    [imgSrcs],
  );

  return (
    <Grid className={frameType}>
      <Title title={title} type={frameType} />
      <Booth>
        <Camera handleCapture={capture} type={frameType} />
        <PreviewContainer>
          <PreviewFullList type={frameType} srcs={imgSrcs} blanks={blank} />
          <Notice>
            You can take up to 8 pictures.<br></br>
            In the next step, you will select 4 pictures.
          </Notice>
        </PreviewContainer>
      </Booth>
      <Next>
        <div>RESET</div>
        <div>NEXT</div>
      </Next>
    </Grid>
  );
}

export default PhotoBooth;
