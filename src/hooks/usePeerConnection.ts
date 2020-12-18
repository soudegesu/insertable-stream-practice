export default function usePeerConnection() {
  const getPeerConnection = () => {
    const pc = new RTCPeerConnection();
    return pc;
  };

  const getOfferOption = ({ video, audio }: { video: boolean; audio: boolean }): RTCOfferOptions => {
    const offerOptions = {
      offerToReceiveAudio: audio,
      offerToReceiveVideo: video,
    };
    return offerOptions;
  };

  // const senderTransform = (sender: RTCRtpSender) => {
  //   const senderStreams = (sender as any).createEncodedStreams();

  //   const readableStream = senderStreams.readable;
  //   const writableStream = senderStreams.writable;

  //   readableStream.pipeTo(writableStream);
  // };

  return { getPeerConnection, getOfferOption };
}
