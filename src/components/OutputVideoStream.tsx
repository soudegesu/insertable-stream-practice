import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { outputMediaStreamAtom } from '../states/atom';
import VideoStream from './VideoStream';

const OutputVideoStream: FC = () => {
  const outputStream = useRecoilValue(outputMediaStreamAtom);

  return <VideoStream stream={outputStream} />;
};

export default OutputVideoStream;
