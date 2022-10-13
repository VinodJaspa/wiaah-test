import { ImageFile } from "../index";
import { Upload } from "graphql-upload";

export function PrepareGqlUploads(files: Upload[]): ImageFile[] {
  const meta: ImageFile[] = files.map((v) => ({
    meta: {
      mimetype: v.file.mimetype,
      name: v.file.filename,
    },
    stream: v.file.createReadStream(),
  }));

  return meta;
}
