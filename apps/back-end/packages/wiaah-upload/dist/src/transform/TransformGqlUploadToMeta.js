"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformGqlUploadToMeta = void 0;
function TransformGqlUploadToMeta(gqlUpload) {
    const { file: { filename, mimetype }, } = gqlUpload;
    return {
        mimetype,
        name: filename,
    };
}
exports.TransformGqlUploadToMeta = TransformGqlUploadToMeta;
//# sourceMappingURL=TransformGqlUploadToMeta.js.map