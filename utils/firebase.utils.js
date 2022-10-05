const { initializeApp } = require("firebase/app");
const { getStorage, uploadBytes, ref } = require("firebase/storage");

const dotenv = require("dotenv");

//models
const { ProductImgs } = require("../models/productImgs.model");

dotenv.config({ path: "./config.env" });

const firebaseConfig = {
  apiKey: "AIzaSyClEU4qf4qjbolXncAhJZ4209AZ0ayVKu8",
  projectId: "e-commers-back",
  storageBucket: "e-commers-back.appspot.com",
  messagingSenderId: "778005422249",
  appId: "1:778005422249:web:578b9f37c49ae0139289b8"
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

