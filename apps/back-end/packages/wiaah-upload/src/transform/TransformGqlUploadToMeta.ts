import { FileUploadMeta } from "../index";
import type { Upload } from "graphql-upload-ts";

export function TransformGqlUploadToMeta(gqlUpload: Upload): FileUploadMeta {
  const {
    file: { filename, mimetype },
  } = gqlUpload;
  return {
    mimetype,
    name: filename,
  };
}
