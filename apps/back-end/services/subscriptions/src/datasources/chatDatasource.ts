import { GatewayDataSource } from './gatewayDatasource';
import { gql } from 'graphql-tag';

export class ChatDataSource extends GatewayDataSource {
  constructor(gatewayUrl: string) {
    super(gatewayUrl);
  }

  async fetchAndMergeNonPayloadChatMessageData(messageId, payload, info) {
    const selections = this.buildNonPayloadSelections(payload, info);
    const payloadData = Object.values(payload)[0];

    if (!selections) {
      return payloadData;
    }

    const Subscription_ChatMessage = gql`
      query Subscription_ChatMessage($id: ID!) {
        chatMessage(id: $id) {
          ${selections}
        }
      }
    `;

    try {
      const response = await this.query(Subscription_ChatMessage, {
        variables: { id: messageId },
      });
      return this.mergeFieldData(payloadData, response.data.chatMessage);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAndMergeNonPayloadChatRoomData(roomId, payload, info) {
    const selections = this.buildNonPayloadSelections(payload, info);
    const payloadData = Object.values(payload)[0];

    if (!selections) {
      return payloadData;
    }

    const query = gql`
      query Subscription_ChatRoom($id: ID!) {
        getChatRoom(id: $id) {
          ${selections}
        }
      }
    `;

    try {
      const response = await this.query(query, {
        variables: { id: roomId },
      });
      return this.mergeFieldData(payloadData, response.data.chatMessage);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchCanAccessChatRoom(roomId: string, ctx?: any): Promise<boolean> {
    const query = gql`
      query CanAccessRoom($id: ID!) {
        canAccessRoom(rooId: $id)
      }
    `;

    try {
      const response = await this.query(query, {
        variables: {
          id: roomId,
        },
        context: {
          headers: {
            cookie: { [process.env.COOKIES_KEY || 'Auth_cookie']: ctx.token },
          },
        },
      });
      return response.data.canAccessRoom;
    } catch (error) {
      console.error(error);
    }
  }
}
