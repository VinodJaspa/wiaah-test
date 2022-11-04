import { GatewayDataSource } from './gatewayDatasource';
import { gql } from 'graphql-tag';

export class ChatDataSource extends GatewayDataSource {
  constructor(gatewayUrl: string) {
    super(gatewayUrl);
  }

  async fetchAndMergeNonPayloadChatMessageData(postID, payload, info) {
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
        variables: { id: postID },
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
            cookies: ctx?.token,
          },
        },
      });
      return response.data.canAccessRoom;
    } catch (error) {
      console.error(error);
    }
  }
}
