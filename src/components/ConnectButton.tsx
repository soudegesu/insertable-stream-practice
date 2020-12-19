import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { useRecoilCallback } from 'recoil';
import useTransformaer from '../hooks/useTransformer';
import {
  audioAtom,
  inputMediaStreamAtom,
  inputPCAtom,
  outputMediaStreamAtom,
  outputPCAtom,
  videoAtom,
} from '../states/atom';

const ConnectButton: FC = () => {
  const { handleOnClick } = useConnectButton();

  return (
    <Button variant="contained" color="primary" onClick={handleOnClick}>
      Connect
    </Button>
  );
};

const useConnectButton = () => {
  const { senderTransform } = useTransformaer();

  const handleOnTrack = useRecoilCallback(
    ({ set }) => (e: RTCTrackEvent) => {
      const stream = e.streams[0];
      set(outputMediaStreamAtom, stream);
    },
    [],
  );

  const handleOnClick = useRecoilCallback(({ snapshot, set }) => async () => {
    const audio = await snapshot.getPromise(audioAtom);
    const video = await snapshot.getPromise(videoAtom);
    const stream = await snapshot.getPromise(inputMediaStreamAtom);
    if (!stream) {
      return;
    }
    const config = { encodedInsertableStreams: true } as any;
    const inputPC = new RTCPeerConnection(config);
    set(inputPCAtom, inputPC);
    stream.getTracks().forEach((track) => inputPC.addTrack(track, stream));
    inputPC.getSenders().forEach(senderTransform);

    const outputPC = new RTCPeerConnection();
    set(outputPCAtom, outputPC);
    outputPC.ontrack = handleOnTrack;

    inputPC.onicecandidate = async (e: RTCPeerConnectionIceEvent) => {
      console.log(outputPC);
      const candidate = e.candidate;
      if (candidate) await outputPC.addIceCandidate(candidate).catch((e) => console.error(e));
      console.log(`outputPC addIceCandidate success`);
    };
    outputPC.onicecandidate = async (e: RTCPeerConnectionIceEvent) => {
      console.log(inputPC);
      const candidate = e.candidate;
      if (candidate) await inputPC.addIceCandidate(candidate).catch((e) => console.error(e));
      console.log(`inputPC addIceCandidate success`);
    };

    try {
      const offer = await inputPC.createOffer(getOfferOption({ video, audio }));
      console.log(`Offer from input ${offer.sdp}`);
      console.log('input setLocalDescription start');
      await inputPC.setLocalDescription(offer);
      await outputPC.setRemoteDescription(offer);

      const answer = await outputPC.createAnswer(getOfferOption({ video, audio }));
      console.log(`Answer from output:\n${answer.sdp}`);
      console.log('output setLocalDescription start');
      await outputPC.setLocalDescription(answer);
      console.log('input setRemoteDescription start');
      await inputPC.setRemoteDescription(answer);
    } catch (e) {
      console.error(e);
    }
  });

  const getOfferOption = ({ video, audio }: { video: boolean; audio: boolean }): RTCOfferOptions => {
    const offerOptions = {
      offerToReceiveAudio: audio,
      offerToReceiveVideo: video,
    };
    return offerOptions;
  };

  return { handleOnClick };
};

export default ConnectButton;
