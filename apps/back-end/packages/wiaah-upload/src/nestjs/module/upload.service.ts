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
import { firstValueFrom } from "rxjs";
import * as fs from "fs";
import * as FormData from "form-data";
import * as crypto from "crypto";

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
  private cloudName = this.options.cloudName;

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
    audio: {
      mp3: "audio/mp3",
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
      case UploadServiceProviders.CLOUDINARY:
        return Promise.all(images.map(img => this.uploadCloudinaryImage(img)));
      default:
        this.logger.error("Incorrect upload service provider");
        throw new InternalServerErrorException();
    }
  }

  async uploadVideos(videoFile: VideoFile) {
    switch (this.serviceProvider) {
      case UploadServiceProviders.CLOUDINARY:
        return this.uploadCloudinaryVideo(videoFile);
      default:
        this.logger.error("Incorrect upload service provider");
        throw new InternalServerErrorException();
    }
  }

  private async uploadCloudinaryImage(image: ImageFile) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${this.secretKey}`)
      .digest("hex");
  
    const form = new FormData();
  
    if (image.filePath) {
      form.append("file", fs.createReadStream(image.filePath));
    } else if (image.buffer && image.originalname) {
      form.append("file", image.buffer, image.originalname);
    } else {
      throw new InternalServerErrorException("Missing filePath or buffer.");
    }
  
    form.append("api_key", this.serviceKey);
    form.append("timestamp", timestamp.toString());
    form.append("signature", signature);
  
    try {
      const response$ = this.httpService.post(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        form,
        {
          headers: form.getHeaders(),
        }
      );
      const res = await firstValueFrom(response$);
      return {
        src: res.data.secure_url,
        mimetype: res.data.resource_type,
      };
    } catch (error:any) {
      this.logger.error("Cloudinary image upload failed", error.message);
      throw new InternalServerErrorException("Image upload failed");
    }
  }
  

  private async uploadCloudinaryVideo(video: VideoFile) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${this.secretKey}`)
      .digest("hex");

    const form = new FormData();
    form.append("file", fs.createReadStream(video.filePath));
    form.append("api_key", this.serviceKey);
    form.append("timestamp", timestamp.toString());
    form.append("signature", signature);

    try {
      const response$ = this.httpService.post(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/video/upload`,
        form,
        {
          headers: form.getHeaders(),
        }
      );
      const res = await firstValueFrom(response$);
      return {
        src: res.data.secure_url,
        mimetype: res.data.resource_type,
      };
    } catch (error:any) {
      this.logger.error("Cloudinary video upload failed", error.message);
      throw new InternalServerErrorException("Video upload failed");
    }
  }
}
