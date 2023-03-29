import { FileUploadMeta } from "./fileMeta";

export type BaseFileUploadData = {
  meta: FileUploadMeta;
  stream: any;
};

export type ImageFile = BaseFileUploadData;
export type VideoFile = any;
export type DocumentFile = any;
