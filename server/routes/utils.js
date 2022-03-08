import express from "express";
import { getAuth } from "../google/index.js"
import { listEvents, listGooglePhotos } from "./index.js"

const app = express();
const port = process.env.port || 80;


  
    app.use('/events', listEvents);
    app.use('/photos', listGooglePhotos);
    app.listen(port);
    console.log(`server listening on ${port}`);


export default run