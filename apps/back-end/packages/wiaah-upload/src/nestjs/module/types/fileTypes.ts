import { FileUploadMeta } from "./fileMeta";
import { ReadStream } from "fs";

type BaseFileUploadData = {
  meta: FileUploadMeta;
  stream: ReadStream;
};

export type ImageFile = BaseFileUploadData;
export type VideoFile = any;
export type DocumentFile = any;
