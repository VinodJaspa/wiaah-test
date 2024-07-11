import { jest } from "@jest/globals";

export class NestKafkaClientMock {
  emit: jest.Mock<any, any> = jest.fn() as jest.Mock<any, any>;
  send: jest.Mock<any, any> = jest.fn() as jest.Mock<any, any>;
  connect: jest.Mock<any, any> = jest.fn() as jest.Mock<any, any>;
  subscribeToResponseOf: jest.Mock<any, any> = jest.fn() as jest.Mock<any, any>;
  close: jest.Mock<any, any> = jest.fn() as jest.Mock<any, any>;
  reset() {
    this.emit.mockClear();
    this.send.mockClear();
    this.connect.mockClear();
    this.subscribeToResponseOf.mockClear();
  }
}
