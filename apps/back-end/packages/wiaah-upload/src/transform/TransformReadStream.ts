import { ImageFile } from "../index";
import { ReadStream } from "fs";

export function TransformReadStream(
  streams: ReadStream | ReadStream[]
): ImageFile[] {
  const isArray = Array.isArray(streams);

  function transform(stream: ReadStream): ImageFile {
    return {} as ImageFile;
  }

  if (isArray) {
    return streams.map((v) => transform(v));
  } else {
    transform(streams);
  }
}
