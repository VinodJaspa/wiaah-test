import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import {
  FileUploadMeta,
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

  async uploadFiles(files: ImageFile[], userId: string) {
    const sortedFiles: Record<string, ImageFile[]> = files.reduce(
      (acc, curr) => {
        // TODO: get file type form mimetype
        const fileType = "";

        const newAcc = { ...acc };
        newAcc[fileType] = [...acc[fileType], curr];
        return newAcc;
      },
      {} as Record<string, ImageFile[]>
    );
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
