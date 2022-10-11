"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepareGqlUploads = void 0;
function PrepareGqlUploads(files) {
    const meta = files.map((v) => ({
        meta: {
            mimetype: v.file.mimetype,
            name: v.file.filename,
        },
        stream: v.file.createReadStream(),
    }));
    return meta;
}
exports.PrepareGqlUploads = PrepareGqlUploads;
//# sourceMappingURL=PrepareGqlUpload.js.map