const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
  try {
    console.log("--- Starting Upload to ImageKit ---");
    const result = await imageKit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: "/zaika_zone_videos",
      useUniqueFileName: true,
    });
    console.log("✅ Upload Successful:", result.url);
    return result;
  } catch (error) {
    // 🚨 This will print the SPECIFIC reason in your terminal (e.g., "Invalid Private Key")
    console.error("❌ IMAGEKIT ERROR DETAILS:", error);
    throw error;
  }
}

module.exports = { uploadFile };
