import { atom } from 'recoil';

export const mediaStreamAtom = atom<MediaStream | undefined>({
  key: 'mediaStream',
  default: undefined,
});

export const peerConnectionAtom = atom<RTCPeerConnection | undefined>({
  key: 'rtcPeer',
  default: undefined,
});
