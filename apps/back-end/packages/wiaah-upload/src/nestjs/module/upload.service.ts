import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import {
  BaseFileUploadData,
  ImageFile,
  UploadModuleForRootOptions,
  VideoFile,
} from "./types";
import { UploadServiceProviders } from "./constants";

@Injectable()
export class UploadService {
  constructor(
    @Inject("options") private readonly options: UploadModuleForRootOptions,
    private readonly httpService: HttpService
  ) {}

  private logger = new Logger("UploadService");

  private serviceProvider = this.options.provider;
  private serviceKey = this.options.serviceKey;
  private secretKey = this.options.secretKey;

  async uploadFiles(
    files: {
      file: BaseFileUploadData;
      options: {
        allowedMimtypes?: string[];
        maxSecDuration?: number;
        maxSizeKb?: number;
      };
    }[]
  ): Promise<string[]> {
    return [];
  }

  async uploadImages(images: ImageFile[], userId: string) {
    switch (this.serviceProvider) {
      case UploadServiceProviders.CLOUDFLARE:
        return this.uploadCloudFlareImages(images);
      default:
        this.logger.error("incorrect upload service provider");
        throw new InternalServerErrorException();
    }
  }

  async uploadVideos(videoFile: VideoFile) {}

  async uploadCloudFlareImages(imageFile: ImageFile[]) {
    return true;
  }

  async uploadCloudFlareVideos(videoFile: ImageFile[]) {}
}
