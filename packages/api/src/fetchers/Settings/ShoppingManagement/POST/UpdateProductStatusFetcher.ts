import { UpdateProductStatusDto } from "dto";

export const UpdateProductStatusFetcher =
  async ({}: UpdateProductStatusDto) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(null);
      }, 1000);
    });
  };
