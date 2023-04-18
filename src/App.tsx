import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';

const Preview = styled.img`
  width: 180px;
`;

function App() {
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const webcamRef = useRef<any>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrcs((prev) => [...prev, imageSrc]);
  }, [webcamRef, setImgSrcs]);

  return (
    <div className="App">
      <h1>4CUTS in Web</h1>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" audio={false} />
      <button onClick={capture}>📸</button>
      {imgSrcs.map((imgSrc: string, i: number) => {
        return <Preview key={i} src={imgSrc} alt={`take${i}`} />;
      })}
    </div>
  );
}

export default App;
