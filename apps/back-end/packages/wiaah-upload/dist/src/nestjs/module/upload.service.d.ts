import { HttpService } from "@nestjs/axios";
import { BaseFileUploadData, ImageFile, UploadModuleForRootOptions, VideoFile } from "./types";
export declare enum FileTypeEnum {
    video = "video",
    image = "image",
    pdf = "pdf"
}
export declare class UploadService {
    private readonly options;
    private readonly httpService;
    constructor(options: UploadModuleForRootOptions, httpService: HttpService);
    private logger;
    private serviceProvider;
    private serviceKey;
    private secretKey;
    mimetypes: {
        videos: {
            mp4: string;
            mov: string;
            all: string[];
        };
        image: {
            jpeg: string;
            png: string;
            jpg: string;
            all: string[];
        };
        pdf: string;
    };
    uploadFiles(files: {
        file: BaseFileUploadData;
        options: {
            allowedMimtypes?: string[];
            maxSecDuration?: number;
            maxSizeKb?: number;
        };
    }[]): Promise<{
        src: string;
        mimetype: string;
    }[]>;
    getFileTypeFromMimetype(mimetype: string): FileTypeEnum;
    uploadImages(images: ImageFile[], userId: string): Promise<boolean>;
    uploadVideos(videoFile: VideoFile): Promise<void>;
    uploadCloudFlareImages(imageFile: ImageFile[]): Promise<boolean>;
    uploadCloudFlareVideos(videoFile: ImageFile[]): Promise<void>;
}
