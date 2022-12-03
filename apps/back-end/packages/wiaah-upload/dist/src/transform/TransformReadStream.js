"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformReadStream = void 0;
function TransformReadStream(streams) {
    const isArray = Array.isArray(streams);
    function transform(stream) {
        return {};
    }
    if (isArray) {
        return streams.map((v) => transform(v));
    }
    else {
        transform(streams);
    }
}
exports.TransformReadStream = TransformReadStream;
//# sourceMappingURL=TransformReadStream.js.map