async function passThrough(chunk, controller) {
  const view = new DataView(chunk.data);
  const newData = new ArrayBuffer(chunk.data.byteLength);
  const newView = new DataView(newData);
  // just copy
  for (let i = 0; i < chunk.data.byteLength; i++) {
    newView.setInt8(i, view.getInt8(i));
  }
  chunk.data = newData;
  controller.enqueue(chunk);
}

onmessage = async (event) => {
  const { operation } = event.data;
  switch (operation) {
    case 'passThrough':
      const { readableStream, writableStream } = event.data;
      const transformStream = new TransformStream({
        start: () => {
          console.log('start transform');
        },
        transform: passThrough,
        flush: () => {
          console.log('flush transform');
        },
      });
      readableStream.pipeThrough(transformStream).pipeTo(writableStream);
      break;
  }
};
