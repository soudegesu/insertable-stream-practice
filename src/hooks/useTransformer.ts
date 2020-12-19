import { useEffect } from 'react';
import { facemeshModelAtom, videoConstraintsAtom } from '../states/atom';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { tensor3d } from '@tensorflow/tfjs-core';
require('@tensorflow/tfjs-backend-webgl');

export default function useTransformaer() {
  const [facemeshLandmarkModel, setFacemeshLandmarkModel] = useRecoilState(facemeshModelAtom);
  const { height, width } = useRecoilValue(videoConstraintsAtom);

  const senderTransform = (sender: RTCRtpSender) => {
    const senderStreams = (sender as any).createEncodedStreams();

    const readableStream = senderStreams.readable;
    const writableStream = senderStreams.writable;

    const transformStream = new TransformStream({
      transform: estimate,
    });

    readableStream.pipeThrough(transformStream).pipeTo(writableStream);
  };

  const estimate = useRecoilCallback(
    () => async (chunk: any, controller: TransformStreamDefaultController) => {
      const buffer = new Uint8Array(width * height * 3);
      let offset = 0;
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = chunk.data[offset];
        buffer[i + 1] = chunk.data[offset + 1];
        buffer[i + 2] = chunk.data[offset + 2];
        offset += 4;
      }
      const tensor = tensor3d(buffer, [height, width, 3]);
      await facemeshLandmarkModel?.estimateFaces({
        input: tensor,
        predictIrises: true,
      });

      controller.enqueue(chunk);
    },
    [facemeshLandmarkModel],
  );

  useEffect(() => {
    (async () => {
      if (!setFacemeshLandmarkModel) {
        return;
      }
      const landmarkModel = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 },
      );
      setFacemeshLandmarkModel(landmarkModel);
    })();
  }, [setFacemeshLandmarkModel]);

  return { senderTransform };
}
