import React, { FC, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { mediaStreamAtom } from '../states/atom';

const VideoStream: FC = () => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const videoStream = useRecoilValue(mediaStreamAtom);

  useEffect(() => {
    if (videoPlayerRef && videoPlayerRef.current && videoStream) {
      videoPlayerRef.current.srcObject = videoStream;
    }
  }, [videoPlayerRef.current, videoStream]);

  return <video ref={videoPlayerRef} muted autoPlay width={480} height={360} />;
};

const useVideoStream = () => {
  const handleOnCanPlay = () => {};

  return {};
};

export default VideoStream;
