import express from 'express'
import { listEvents } from './calendar.js';
import { docFile } from './googleDoc.js';
import { listFiles } from './googleDrive.js';
import { listGooglePhotos } from './googlePhotos.js';
const googleRouter = express.Router()

googleRouter.use('/files', listFiles);
googleRouter.use('/events', listEvents);
googleRouter.use('/photos', listGooglePhotos);
googleRouter.use('/doc/:id', docFile);
export default googleRouter