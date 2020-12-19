export default function useTransformaer() {
  const senderTransform = (sender: RTCRtpSender) => {
    const senderStreams = (sender as any).createEncodedStreams();

    const readableStream = senderStreams.readable;
    const writableStream = senderStreams.writable;

    const transformStream = new TransformStream({
      transform: copyFunction,
    });

    readableStream.pipeThrough(transformStream).pipeTo(writableStream);
  };

  const copyFunction = (chunk: any, controller: any) => {
    const view = new DataView(chunk.data);
    const newData = new ArrayBuffer(chunk.data.byteLength);
    const newView = new DataView(newData);

    for (let i = 0; i < chunk.data.byteLength; i++) {
      newView.setInt8(i, view.getInt8(i));
    }
    chunk.data = newData;

    controller.enqueue(chunk);
  };

  return { senderTransform };
}
