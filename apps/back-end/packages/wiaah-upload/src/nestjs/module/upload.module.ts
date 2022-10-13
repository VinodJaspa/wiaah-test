import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { DynamicModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UploadModuleForRootOptions } from "./types";
import { UploadService } from "./upload.service";

@Module({})
export class UploadModule {
  static forRoot(options: UploadModuleForRootOptions): DynamicModule {
    return {
      module: UploadModule,
      providers: [
        UploadService,
        {
          provide: "options",
          useValue: options,
        },
      ],
      imports: [
        HttpModule.register({
          maxRedirects: 5,
        }),

        ConfigModule.forRoot(),
      ],
      exports: [UploadService],
    };
  }
}
