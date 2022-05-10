
export class Confirm {
  message?: string;
  callbackFn?: () => void;

  open(message: string, callbackFn: () => void) {
    this.message = message;
    this.callbackFn = callbackFn;
  }

  close() {
    this.message = undefined;
    this.callbackFn = undefined;
  }
}
