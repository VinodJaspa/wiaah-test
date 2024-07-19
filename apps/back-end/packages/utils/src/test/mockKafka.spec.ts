export class NestKafkaClientMock {
  emit: jest.Mock<any, any>;
  send: jest.Mock<any, any>;
  connect: jest.Mock<any, any>;
  subscribeToResponseOf: jest.Mock<any, any>;
  close: jest.Mock<any, any>;

  constructor() {
    this.emit = jest.fn() as jest.Mock<void, [string, any]>;
    this.send = jest.fn() as jest.Mock<void, [string, any]>;
    this.connect = jest.fn() as jest.Mock<void, []>;
    this.subscribeToResponseOf = jest.fn() as jest.Mock<void, [string]>;
    this.close = jest.fn() as jest.Mock<void, []>;
  }

  reset() {
    this.emit.mockClear();
    this.send.mockClear();
    this.connect.mockClear();
    this.subscribeToResponseOf.mockClear();
    this.close.mockClear();
  }
}
