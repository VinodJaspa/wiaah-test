import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ImageFile, UploadModuleForRootOptions, VideoFile } from "./types";
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

  async uploadImages(imageFile: ImageFile) {
    switch (this.serviceProvider) {
      case UploadServiceProviders.CLOUDFLARE:
        return this.uploadCloudFlareImage(imageFile);
      default:
        this.logger.error("incorrect upload service provider");
        throw new InternalServerErrorException();
    }
  }

  async uploadVideos(videoFile: VideoFile) {}

  async uploadCloudFlareImage(imageFile: ImageFile) {
    return true;
  }

  async uploadCloudFlareVideo(videoFile: ImageFile) {}
}
