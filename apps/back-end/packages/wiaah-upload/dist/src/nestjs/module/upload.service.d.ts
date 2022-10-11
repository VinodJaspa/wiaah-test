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
    uploadImages(imageFile: ImageFile): Promise<boolean>;
    uploadVideos(videoFile: VideoFile): Promise<void>;
    uploadCloudFlareImage(imageFile: ImageFile): Promise<boolean>;
    uploadCloudFlareVideo(videoFile: ImageFile): Promise<void>;
}
