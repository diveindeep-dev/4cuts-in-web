import React, { useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import Mockup from '../components/frame/Mockup';
import { aspectRatio } from '../styles/Frame';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { bodyContainer, flexCenter, shutterStyle } from '../styles/Mixin';

interface StyleProps {
  type?: string;
}

const H2 = styled.h2`
  font-size: 3.3rem;
  font-weight: 100;
`;

const Pic = styled.div`
  align-self: center;
  border: 2px solid ${colorAll.main};
  opacity: 0.2;
  transform: rotate(-25deg);
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 320px;
  padding: 20px;
`;

const ShutterWrap = styled.div`
  ${flexCenter}
  width: 90px;
  height: 90px;
`;

const Shutter = styled.button`
  ${shutterStyle()}
`;

const Camera = styled.div`
  ${flexCenter}
  padding: 20px;
  background-color: ${colorAll.dark};
`;

const Blank = styled.div<StyleProps>`
  ${flexCenter}
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
  border: 1px solid ${colorAll.line};
  font-size: 1.3rem;
`;

const Preview = styled.img<StyleProps>`
  aspect-ratio: ${({ type }) => aspectRatio[`${type}`]};
`;

const Previews = styled.div`
  display: grid;
  grid-gap: 10px;
  place-items: center center;
`;

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
    ${Previews} {
      padding: 30px 0;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      & > ${Blank}, ${Preview} {
        width: 100%;
      }
    }
  }

  &.wide {
    ${Previews} {
      padding: 0 30px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      & > ${Blank}, ${Preview} {
        height: 190px;
      }
    }
    ${Camera} {
      flex-direction: column;
    }
  }
`;

function PhotoBooth() {
  const location = useLocation();
  const title: string = location.state.frame;
  const frameType: string = title.toLowerCase();
  const webcamRef = useRef<any>(null);
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const [blank, setBlank] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

  const videoConstraints = {
    aspectRatio: aspectRatio[frameType],
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrcs((prev) => [...prev, imageSrc]);
    setBlank((prev) => prev.filter((_, i) => i !== 0));
  }, []);

  return (
    <Grid className={frameType}>
      <Title>
        <H2>{title}</H2>
        <Pic>
          <Mockup type={frameType} />
        </Pic>
      </Title>
      <Booth>
        <Camera>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            audio={false}
            mirrored={true}
            videoConstraints={videoConstraints}
          />
          <ShutterWrap>
            <Shutter onClick={capture} />
          </ShutterWrap>
        </Camera>
        <PreviewContainer>
          <Previews>
            {imgSrcs.map((imgSrc: string, i: number) => {
              return (
                <Preview
                  key={i}
                  src={imgSrc}
                  alt={`take${i}`}
                  type={frameType}
                />
              );
            })}
            {blank.map((blank: number, i: number) => {
              return <Blank key={i} type={frameType}>{`TAKE ${blank}`}</Blank>;
            })}
          </Previews>
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
