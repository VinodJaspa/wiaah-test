/// <reference types="node" />
import { ImageFile } from "../index";
import { ReadStream } from "fs";
export declare function TransformReadStream(streams: ReadStream | ReadStream[]): ImageFile[];
