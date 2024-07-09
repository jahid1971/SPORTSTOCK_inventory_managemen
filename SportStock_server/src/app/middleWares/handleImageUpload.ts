import { NextFunction, Request, Response } from "express";

import multer from "multer";

export const handleImageUpload = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // multer memory storage
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    
    const uploadMiddleware = upload.single("file");

    uploadMiddleware(req, res, (err) => {
        if (err) return next(err);
        next();
    });
};
