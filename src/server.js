import express from "express";
import morgan from "morgan";
import global from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express(); // << express 어플생성
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", global);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
