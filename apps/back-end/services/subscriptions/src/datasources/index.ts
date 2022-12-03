import { gatewayEndpoint } from '../app.module';
import { ChatDataSource } from './chatDatasource';
import { addGatewayDataSourceToSubscriptionContext } from './gatewayDatasource';

export * from './chatDatasource';

export function GenerateDataSources(ctx: any) {
  const chatDatasource = new ChatDataSource(gatewayEndpoint);
  const dataSourceContext = addGatewayDataSourceToSubscriptionContext(ctx, {
    chat: chatDatasource,
  });

  return dataSourceContext;
}

export type CtxDatasources<TCtx = unknown> = ReturnType<
  typeof GenerateDataSources
> &
  TCtx;
