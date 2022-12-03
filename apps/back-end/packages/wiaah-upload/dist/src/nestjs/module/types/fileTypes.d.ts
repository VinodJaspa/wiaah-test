/// <reference types="node" />
import { FileUploadMeta } from "./fileMeta";
import { ReadStream } from "fs";
declare type BaseFileUploadData = {
    meta: FileUploadMeta;
    stream: ReadStream;
};
export declare type ImageFile = BaseFileUploadData;
export declare type VideoFile = any;
export declare type DocumentFile = any;
export {};
