import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";
import notFound from "./app/middleWares/notFound";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: [
            "https://sport-stock.netlify.app",
            "https://sport-stock-client.vercel.app",
            "http://localhost:5173",
        ],
        credentials: true, // Allow credentials (cookies) to be sent
    })
);

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "server is running" });
});

app.use(notFound);

export default app;
