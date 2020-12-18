import { atom } from 'recoil';

export const videoAtom = atom<boolean>({
  key: 'video',
  default: true,
});

export const audioAtom = atom<boolean>({
  key: 'audio',
  default: false,
});

export const inputMediaStreamAtom = atom<MediaStream | undefined>({
  key: 'inputMediaStream',
  default: undefined,
});

export const outputMediaStreamAtom = atom<MediaStream | undefined>({
  key: 'outputMediaStream',
  default: undefined,
});

export const inputPCAtom = atom<RTCPeerConnection | undefined>({
  key: 'inputPC',
  default: undefined,
});

export const outputPCAtom = atom<RTCPeerConnection | undefined>({
  key: 'outputPC',
  default: undefined,
});
