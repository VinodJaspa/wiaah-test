import { FileUploadMeta } from "./fileMeta";

export type BaseFileUploadData = {
  filePath?: string;       // path to file on disk (optional)
  buffer?: Buffer;         // file data buffer (optional)
  originalname?: string;   // original filename (optional)
  meta: FileUploadMeta;
  stream?: any;
};


export type ImageFile = BaseFileUploadData;
export type VideoFile = any;
export type DocumentFile = any;
