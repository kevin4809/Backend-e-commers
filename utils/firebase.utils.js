const { initializeApp } = require("firebase/app");
const { getStorage, uploadBytes, ref } = require("firebase/storage");

const dotenv = require("dotenv");

//models
const { ProductImgs } = require("../models/productImgs.model");

dotenv.config({ path: "./config.env" });

const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  appId: process.env.FB_APPID,
};

const fireBaseApp = initializeApp(firebaseConfig);
const storage = getStorage(fireBaseApp);

const uploadProductImg = async (imgs, productId) => {
  try {
    const imgsPromises = imgs.map(async (img) => {
      // Create unique filename
      const [filename, extension] = img.originalname.split(".");
      const productImg = `${
        process.env.NODE_ENV
      }/products/${productId}/${filename}-${Date.now()}.${extension}`;

      // Create ref
      const imgRef = ref(storage, productImg);

      // Upload img
      const result = await uploadBytes(imgRef, img.buffer);

      return await ProductImgs.create({
        productId,
        imgUrl: result.metadata.fullPath,
      });
    });

    await Promise.all(imgsPromises);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { storage, uploadProductImg };
