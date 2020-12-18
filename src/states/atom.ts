import { atom } from 'recoil';

export const mediaStreamAtom = atom<MediaStream | undefined>({
  key: 'mediaStream',
  default: undefined,
});
