import { Action } from 'prismaClient';

export class ActionCreatedEvent {
  constructor(public readonly action: Action) {}
}
