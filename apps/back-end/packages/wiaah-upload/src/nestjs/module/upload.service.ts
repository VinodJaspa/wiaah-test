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

export enum FileTypeEnum {
  video = "video",
  image = "image",
  pdf = "pdf",
}

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

  mimetypes = {
    videos: {
      mp4: "video/mp4",
      mov: "video/mov",
      all: [] as string[],
    },
    image: {
      jpeg: "image/jpeg",
      png: "image/png",
      jpg: "image/jpg",
      all: [] as string[],
    },
    pdf: "application/pdf",
  };

  async uploadFiles(
    files: {
      file: BaseFileUploadData;
      options: {
        allowedMimtypes?: string[];
        maxSecDuration?: number;
        maxSizeKb?: number;
      };
    }[]
  ): Promise<{ src: string; mimetype: string }[]> {
    return [];
  }

  getFileTypeFromMimetype(mimetype: string) {
    const vidMimetypes = Object.values(this.mimetypes.videos);
    const imgMimetypes = Object.values(this.mimetypes.image);

    if (vidMimetypes.includes(mimetype)) {
      return FileTypeEnum.video;
    }

    if (imgMimetypes.includes(mimetype)) {
      return FileTypeEnum.image;
    }
    if (mimetype === this.mimetypes.pdf) {
      return FileTypeEnum.pdf;
    }
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
