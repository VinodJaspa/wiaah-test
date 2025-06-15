export async function uploadImageToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default1");
  
    const cloudName = "dvhitbmqt"; // Replace with your Cloudinary cloud name
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Upload failed");
      }
  
      const data = await response.json();
      return data.secure_url; // or full response object if needed
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw err;
    }
  }
  