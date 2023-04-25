import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import Title from '../components/Title';
import Camera from '../components/Camera';
import Frame from '../components/frame';
import Previews from '../components/previews';
import today from '../utils/date';
import styled from 'styled-components';
import { frameColors, frameOrders } from '../styles/Frame';
import { colorAll, fontAll } from '../styles/Variables';
import { SideButton, bodyContainer, flexCenter } from '../styles/Mixin';

interface StyleProps {
  color?: string;
}

const Notice = styled.div`
  ${flexCenter}
  height: 100%;
  padding: 10px 0;
  text-align: center;
  font-size: 1rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Booth = styled.div`
  display: flex;
  border-left: 1px solid ${colorAll.line};
  border-right: 1px solid ${colorAll.line};
  background-color: ${colorAll.back};
  z-index: 1;
`;

const ColorChip = styled.div<StyleProps>`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  &:hover {
    cursor: pointer;
  }
`;

const Palette = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  padding-right: 20px;
  font-size: 1.3rem;
`;

const Saved = styled.div`
  width: 100%;
`;

const Set = styled.div`
  display: flex;
  padding: 20px;
  border-left: 1px solid ${colorAll.line};
  border-right: 1px solid ${colorAll.line};
  background-color: ${colorAll.back};
  z-index: 1;
`;

const Up = styled(SideButton)`
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0;
  width: 100%;
  height: 50%;
`;

const Down = styled(SideButton)`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 40px 0;
  width: 100%;
  height: 50%;

  div {
    font-size: 1rem;
    padding: 10px;
    font-weight: 100;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  ${bodyContainer}
  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  min-height: 868px;
  font-family: ${fontAll.body};
  font-weight: 100;

  &.basic {
    ${Booth} {
      flex-direction: column;
    }
    ${Set} {
      grid-template-columns: 2fr 1fr;
    }
  }
`;

function PhotoBooth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const frameType: string = title.toLowerCase();
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [currentOrder, setOrder] = useState<string>('first');
  const [pickedColor, setColor] = useState<string>(`#000000`);
  const [selected, setSelected] = useState<Cuts>({
    first: '',
    second: '',
    third: '',
    fourth: '',
  });
  const [error, setError] = useState('');
  const savedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!location.state) {
      return navigate('/');
    } else {
      const frame: string = location.state.frame || 'Basic';
      setTitle(frame);
    }
  }, []);

  useEffect(() => {
    if (imgSrcs.length === 8) {
      setIsNext(true);
    } else if (imgSrcs.length === 4) {
      setError('');
    }
  }, [imgSrcs]);

  const capture = useCallback(
    (ref: MutableRefObject<any>) => {
      if (imgSrcs.length >= 8) return;

      const imageSrc = ref.current.getScreenshot();
      setImgSrcs((prev) => [...prev, imageSrc]);
    },
    [imgSrcs],
  );

  const pickPosition = (position: string) => {
    setOrder(position);
  };

  const pickColor = (color: string) => {
    setColor(color);
  };

  const selectPhoto = (imgSrc: string) => {
    const current = frameOrders.indexOf(currentOrder);
    setSelected({ ...selected, [currentOrder]: imgSrc });
    setOrder(frameOrders[(current + 1) % 4]);
  };

  const retake = () => {
    setImgSrcs([]);
    setIsNext(false);
  };

  const goNext = () => {
    if (imgSrcs.length >= 4) {
      setIsNext(true);
    } else {
      setError('You need at least 4 cuts for the next step.');
    }
  };

  const reset = () => {
    setOrder('first');
    setColor(`#000000`);
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
        saveAs(generate, `${today('file')}-4cuts.png`);
      })();
    }
  };

  return (
    <Grid className={frameType}>
      <Title title={title} type={frameType} />
      {!isNext ? (
        <Booth>
          <Camera
            handleCapture={capture}
            type={frameType}
            color={`${colorAll.dark}`}
          />
          <PreviewContainer>
            <Previews type={frameType} srcs={imgSrcs} />
            <Notice>
              You can take up to 8 pictures.<br></br>
              In the next step, you will select 4 pictures.
            </Notice>
          </PreviewContainer>
        </Booth>
      ) : (
        <Set>
          <Palette>
            <div>Pick Frame Color</div>
            {frameColors.map((color: string, i: number) => {
              return (
                <ColorChip
                  key={i}
                  color={color}
                  onClick={() => pickColor(color)}
                />
              );
            })}
          </Palette>
          <Saved ref={savedRef}>
            <Frame
              type={frameType}
              handlePosition={pickPosition}
              selected={selected}
              currentOrder={currentOrder}
              color={pickedColor}
            />
          </Saved>
          <Previews
            type={`${frameType} set`}
            srcs={imgSrcs}
            handleClick={selectPhoto}
          />
        </Set>
      )}
      <Side>
        <Up onClick={!isNext ? retake : reset}>
          {!isNext ? `RETAKE` : `RESET`}
        </Up>
        <Down onClick={!isNext ? goNext : save}>
          <div>{error}</div>
          {!isNext ? `NEXT` : `SAVE`}
        </Down>
      </Side>
    </Grid>
  );
}

export default PhotoBooth;
