import { UpdateProductStatusDto } from "@Dto";

export const UpdateProductStatusFetcher =
  async ({}: UpdateProductStatusDto) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(null);
      }, 1000);
    });
  };
