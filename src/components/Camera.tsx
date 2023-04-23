import { MutableRefObject, useRef } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { aspectRatio } from '../styles/Frame';
import { colorAll } from '../styles/Variables';
import { flexCenter, shutterStyle } from '../styles/Mixin';

interface CameraProps {
  type: string;
  handleCapture: (ref: MutableRefObject<any>) => void;
}

const ShutterWrap = styled.div`
  ${flexCenter}
  width: 90px;
  height: 90px;
`;

const Shutter = styled.button`
  ${shutterStyle()}
`;

const CAMERA = styled.div`
  ${flexCenter}
  padding: 20px;
  width: 100%;
  background-color: ${colorAll.dark};

  &.camera-basic {
    video {
      max-width: 650px;
    }
  }

  &.camera-wide {
    flex-direction: column;
    video {
      width: 100%;
    }
  }
`;

function Camera({ type, handleCapture }: CameraProps) {
  const webcamRef = useRef<any>(null);

  const videoConstraints = {
    aspectRatio: aspectRatio[type],
  };

  return (
    <CAMERA className={`camera-${type}`}>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/png"
        audio={false}
        mirrored={true}
        videoConstraints={videoConstraints}
      />
      <ShutterWrap>
        <Shutter onClick={() => handleCapture(webcamRef)} />
      </ShutterWrap>
    </CAMERA>
  );
}

export default Camera;
