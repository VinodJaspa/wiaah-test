import { INestApplication } from "@nestjs/common";
import supertest from "supertest";

export function requestGraphql(
  app: INestApplication,
  query: string,
  variables: Record<string, any>
) {
  return supertest(app.getHttpServer()).post("/graphql").send({
    query,
    variables,
  });
}
