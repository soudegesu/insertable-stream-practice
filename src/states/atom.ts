import { atom } from 'recoil';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const videoAtom = atom<boolean>({
  key: 'video',
  default: true,
});

export const videoConstraintsAtom = atom<{ width: number; height: number }>({
  key: 'videoConstraints',
  default: {
    width: 480,
    height: 360,
  },
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

export const facemeshModelAtom = atom<faceLandmarksDetection.FaceLandmarksDetector | undefined>({
  key: 'facemeshModel',
  default: undefined,
  dangerouslyAllowMutability: true,
});
