



import { Router } from 'express'
import liverTrackData from '../controllers/LiveViewer.controllers.js';

const router = Router();

router.post('/', liverTrackData);

export default router;
