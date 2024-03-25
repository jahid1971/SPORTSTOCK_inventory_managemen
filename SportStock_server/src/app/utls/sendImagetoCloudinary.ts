import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import config from "../config";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
    // Upload an image
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            { public_id: `product-/${imageName}` },

            function (err, result) {
                if (err) return reject(err);
                resolve(result);

                // remove file from server
                fs.unlink(path, (err) => {
                    if (err) console.log(err, "error deleting image from uploads");
                    else console.log("image is deleted from uploads.");
                });
            }
        );
    });
};

// multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

export const upload = multer({ storage: storage });
