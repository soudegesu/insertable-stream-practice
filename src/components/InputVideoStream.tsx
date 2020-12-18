import React, { FC, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { mediaStreamAtom } from '../states/atom';

const InputVideoStream: FC = () => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const videoStream = useRecoilValue(mediaStreamAtom);

  useEffect(() => {
    if (videoPlayerRef && videoPlayerRef.current && videoStream) {
      videoPlayerRef.current.srcObject = videoStream;
    }
  }, [videoPlayerRef.current, videoStream]);

  return <video ref={videoPlayerRef} muted autoPlay width={480} height={360} />;
};

export default InputVideoStream;
