import { HttpService } from "@nestjs/axios";
import { ImageFile, UploadModuleForRootOptions, VideoFile } from "./types";
export declare class UploadService {
    private readonly options;
    private readonly httpService;
    constructor(options: UploadModuleForRootOptions, httpService: HttpService);
    private logger;
    private serviceProvider;
    private serviceKey;
    private secretKey;
    uploadFiles(files: ImageFile[], userId: string): Promise<void>;
    uploadImages(images: ImageFile[], userId: string): Promise<boolean>;
    uploadVideos(videoFile: VideoFile): Promise<void>;
    uploadCloudFlareImages(imageFile: ImageFile[]): Promise<boolean>;
    uploadCloudFlareVideos(videoFile: ImageFile[]): Promise<void>;
}
