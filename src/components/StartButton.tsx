import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import useUserMedia from '../hooks/useUserMedia';
import { mediaStreamAtom } from '../states/atom';

const StartButton: FC = () => {
  const { handleOnClick } = useStartButton();

  return (
    <Button variant="contained" color="primary" onClick={handleOnClick}>
      Start
    </Button>
  );
};

const useStartButton = () => {
  const { getUserMedia } = useUserMedia({ constraints: { video: true } });
  const setMediaStream = useSetRecoilState(mediaStreamAtom);

  const handleOnClick = async () => {
    const stream = await getUserMedia();
    setMediaStream(stream);
  };

  return { handleOnClick };
};

export default StartButton;
