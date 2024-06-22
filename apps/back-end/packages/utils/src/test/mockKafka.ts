import { jest } from "@jest/globals";

export class NestKafkaClientMock {
  emit: jest.Mock = jest.fn();
  send: jest.Mock = jest.fn();
  connect: jest.Mock = jest.fn();
  subscribeToResponseOf: jest.Mock = jest.fn();
  close: jest.Mock = jest.fn();
  reset() {
    this.emit.mockClear();
    this.send.mockClear();
    this.connect.mockClear();
    this.subscribeToResponseOf.mockClear();
  }
}
