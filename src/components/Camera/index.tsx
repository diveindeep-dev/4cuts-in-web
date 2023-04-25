import { MutableRefObject, useRef } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { aspectRatio } from '../../styles/Frame';
import { Shutter, flexCenter } from '../../styles/Mixin';

interface CameraProps {
  type: string;
  handleCapture: (ref: MutableRefObject<any>) => void;
  color: string;
  folder?: string;
  count?: number;
}

interface StyleProps {
  color: string;
}

const ShutterWrap = styled.div`
  ${flexCenter}
  width: 100px;
  height: 100px;
`;

const FramePic = styled.img`
  position: absolute;
  height: 100%;
  z-index: 100;
`;

const Viewfinder = styled.div`
  ${flexCenter}
  position: relative;
  width: 100%;
  height: 100%;
`;

const CAMERA = styled.div<StyleProps>`
  ${flexCenter}
  padding: 20px;
  width: 100%;
  background-color: ${({ color }) => color};

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

function Camera({ type, handleCapture, count, color, folder }: CameraProps) {
  const webcamRef = useRef<any>(null);

  const videoConstraints = {
    aspectRatio: aspectRatio[type],
  };

  const framePic = () => {
    if (count !== undefined) {
      const frameIndex = count % 4;
      return (
        <FramePic
          src={require(`../../assets/${folder}/${frameIndex}.png`)}
          alt="frame"
        />
      );
    }
  };

  return (
    <CAMERA className={`camera-${type}`} color={color}>
      <Viewfinder>
        {type === 'custom' && framePic()}
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          audio={false}
          mirrored={true}
          videoConstraints={videoConstraints}
        />
      </Viewfinder>
      <ShutterWrap>
        <Shutter onClick={() => handleCapture(webcamRef)} />
      </ShutterWrap>
    </CAMERA>
  );
}

export default Camera;
