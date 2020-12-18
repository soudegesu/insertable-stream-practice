import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import usePeerConnection from '../hooks/usePeerConnection';
import useUserMedia from '../hooks/useUserMedia';
import { mediaStreamAtom, peerConnectionAtom } from '../states/atom';

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
  const { getPeerConnection } = usePeerConnection();
  const setMediaStream = useSetRecoilState(mediaStreamAtom);
  const setPeerConnection = useSetRecoilState(peerConnectionAtom);

  const handleOnClick = async () => {
    const stream = await getUserMedia();
    setMediaStream(stream);

    const pc = getPeerConnection();
    // add video track
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.getSenders().forEach(senderTransform);

    setPeerConnection(pc);
  };

  const senderTransform = (sender: RTCRtpSender) => {
    const senderStreams = (sender as any).createEncodedStreams();
    console.log(senderStreams);

    const readableStream = senderStreams.readable;
    const writableStream = senderStreams.writable;

    readableStream.pipeTo(writableStream);
  };

  return { handleOnClick };
};

export default StartButton;
