export default function usePeerConnection() {
  const getPeerConnection = () => {
    const pc = new RTCPeerConnection({
      encodedInsertableStreams: true,
    } as any);
    return pc;
  };

  return { getPeerConnection };
}
