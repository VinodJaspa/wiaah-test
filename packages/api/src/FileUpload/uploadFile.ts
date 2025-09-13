
type CloudinaryUploadResult = {
  secure_url: string;
  asset_id: string;
};
export async function uploadFileToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default1");

  const cloudName = "dvhitbmqt";

  // Detect file type
  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data = await response.json();
  return {
    secure_url: data.secure_url,
    asset_id: data.asset_id,
  };
}
