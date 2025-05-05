export class UserLeftRoomEvent {
  constructor(
    public userId: string,
    public roomId: string,
  ) {}
}
