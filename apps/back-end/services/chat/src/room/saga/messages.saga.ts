import { Injectable } from '@nestjs/common';
import { CommandBus, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { ChatMessageSentEvent } from '@message';
import { IncrementRoomMembersUnSeenMessagesCommand } from '../commands';

@Injectable()
export class MessagesSaga {
  constructor(private readonly commandBus: CommandBus) {}
  @Saga()
  handleNewMessages($event: Observable<any>): Observable<any> {
    return $event.pipe(
      ofType(ChatMessageSentEvent),
      map((v) => {
        this.commandBus.execute<
          IncrementRoomMembersUnSeenMessagesCommand,
          boolean
        >(new IncrementRoomMembersUnSeenMessagesCommand(v.message.roomId));
      }),
    );
  }
}
