export default class TransformWorker {
  worker: Worker;
  onWorkerDisconnect: Function | null;

  constructor() {
    this.worker = new Worker('/worker/estimate.worker.js', { name: 'Pass through worker' });
    this.onWorkerDisconnect = null;
  }

  startWorker(): void {
    this.worker.onmessage = (event): void => {
      const { operation } = event.data;
      if (operation === 'disconnect' && typeof this.onWorkerDisconnect === 'function') {
        this.onWorkerDisconnect();
      }
    };
    this.worker.onerror = (event) => {
      console.error(event);
    };
    console.log(this.worker);
  }

  terminateWorker(): void {
    if (this.worker) {
      this.worker.terminate();
    }
  }

  setupSenderTransform(sender: RTCRtpSender): void {
    if (!sender.track) return;
    // @ts-ignore
    const senderStreams = sender.createEncodedStreams();
    const readableStream = senderStreams.readableStream || senderStreams.readable;
    const writableStream = senderStreams.writableStream || senderStreams.writable;
    if (this.worker) {
      this.worker.postMessage(
        {
          operation: 'passThrough',
          readableStream: readableStream,
          writableStream: writableStream,
        },
        [readableStream, writableStream],
      );
    }
  }
}
