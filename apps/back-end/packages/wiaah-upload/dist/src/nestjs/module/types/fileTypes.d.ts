import { FileUploadMeta } from "./fileMeta";
export declare type BaseFileUploadData = {
    meta: FileUploadMeta;
    stream: any;
};
export declare type ImageFile = BaseFileUploadData;
export declare type VideoFile = any;
export declare type DocumentFile = any;
