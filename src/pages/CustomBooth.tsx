import { MutableRefObject, useCallback, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import Title from '../components/Title';
import Camera from '../components/Camera';
import Frame from '../components/frame';
import Previews from '../components/previews';
import today from '../utils/date';
import styled from 'styled-components';
import { SideButton, bodyContainer } from '../styles/Mixin';
import { colorAll, fontAll } from '../styles/Variables';
import { frameOrders } from '../styles/Frame';

interface CustomProps {
  custom: Custom;
}

interface StyleProps {
  color?: any;
}

const Button = styled(SideButton)`
  align-items: center;
  justify-content: center;
  width: 175.5px;
  height: 80px;
  margin-left: 10px;
  border: 1px solid ${colorAll.line};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  padding: 0 20px 30px;
`;

const Saved = styled.div`
  width: 100%;
`;

const FrameContainer = styled.div`
  width: 40%;
  padding-left: 20px;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-left: 1px solid ${colorAll.line};
`;

const Booth = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled.div`
  ${bodyContainer}
  margin: 0 auto;
  display: flex;
  z-index: 10;
`;

const BackImg = styled.img`
  position: absolute;
  opacity: 0.6;
`;

const Div = styled.div<StyleProps>`
  display: flex;
  min-height: 868px;
  font-family: ${fontAll.body};
  font-weight: 100;

  &.meme {
    background-color: ${({ color }) => color.back};

    ${BackImg} {
      left: -100px;
      bottom: 0;
      width: 500px;
    }

    ${Booth} {
      background-color: ${({ color }) => color.back};
    }
  }
`;

function CustomBooth({ custom }: CustomProps) {
  const { title, folder, color, tag } = custom;
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const [currentOrder, setOrder] = useState<string>('first');
  const [selected, setSelected] = useState<Cuts>({
    first: '',
    second: '',
    third: '',
    fourth: '',
  });
  const savedRef = useRef<HTMLDivElement>(null);

  const capture = useCallback((ref: MutableRefObject<any>) => {
    if (imgSrcs.length >= 8) return;

    const imageSrc = ref.current.getScreenshot();
    setImgSrcs((prev) => [...prev, imageSrc]);
  }, []);

  const selectPhoto = (imgSrc: string) => {
    const current = frameOrders.indexOf(currentOrder);
    setSelected({ ...selected, [currentOrder]: imgSrc });
    setOrder(frameOrders[(current + 1) % 4]);
  };

  const pickPosition = (position: string) => {
    setOrder(position);
  };

  const retake = () => {
    setOrder('first');
    setImgSrcs([]);
    setSelected({
      first: '',
      second: '',
      third: '',
      fourth: '',
    });
  };

  const save = () => {
    setOrder('');
    const savedImg = savedRef.current;
    if (savedImg) {
      const option = {
        width: savedImg.clientWidth * 2,
        height: savedImg.clientHeight * 2,
        style: {
          transform: 'scale(2)',
          'transform-origin': '0% 0%',
        },
      };
      (async () => {
        const generate = await domtoimage.toBlob(savedImg, option);
        saveAs(generate, `${today('file')}-${title}.png`);
      })();
    }
  };

  return (
    <Div className={folder} color={color}>
      <Container>
        <Title title={title} type={'custom'} />
        <Booth>
          <CameraContainer>
            <Camera
              handleCapture={capture}
              type={'custom'}
              folder={folder}
              count={imgSrcs.length}
              color={'black'}
            />
            <PreviewContainer>
              <Previews
                type={'custom'}
                srcs={imgSrcs}
                handleClick={selectPhoto}
              />
            </PreviewContainer>
            <ButtonContainer>
              <Button onClick={retake}>RETAKE</Button>
              <Button onClick={save}>SAVE</Button>
            </ButtonContainer>
          </CameraContainer>
          <FrameContainer>
            <Saved ref={savedRef}>
              <Frame
                type={'custom'}
                handlePosition={pickPosition}
                selected={selected}
                currentOrder={currentOrder}
                color={color.frame}
                folder={folder}
                title={tag.title}
              />
            </Saved>
          </FrameContainer>
        </Booth>
      </Container>
    </Div>
  );
}

export default CustomBooth;
