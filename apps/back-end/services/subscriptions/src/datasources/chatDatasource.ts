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
        product(id: $id) {
          ${selections}
        }
      }
    `;

    try {
      const response = await this.query(Subscription_ChatMessage, {
        //@ts-ignore
        variables: { id: postID },
      });
      return this.mergeFieldData(payloadData, response.data.product);
    } catch (error) {
      console.error(error);
    }
  }
}
