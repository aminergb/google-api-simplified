// @ts-nocheck
import express from "express";
import getAuth from './google/auth.js'

const app = express();
import googleRouter from "./routes/googleRoutes.js";


const serverPort = 9001;

app.use(express.urlencoded({ extended: "false" }));

const startup = () => {
    app.set("etag", false);
    app.listen(serverPort);
    console.log(`server listening on ${serverPort}`);
}


const googleAuth = async () => {
    return global.auth = await getAuth();
}

googleAuth()
app.use("/google/", googleRouter)
startup();