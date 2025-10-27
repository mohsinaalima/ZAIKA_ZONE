const ImageKit = require("imagekit");
const { createFood } = require("../controllers/food.controller");

const imageKit = new ImageKit({
  publicKey: "public_lzfwLjeuJOOdd0LPzh8tQyFDZWc",
  privateKey: "private_5pMJ************************",
  urlEndpoint: "https://ik.imagekit.io/zqqfitotb",
});
async function uploadFile(file, fileName) {
    const result = await imageKit.upload({
        file: file, //required
        fileName: fileName, //required
    });
    return result;
};

module.exports = {
    uploadFile,
};