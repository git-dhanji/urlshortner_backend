

import { Router } from 'express'
import apiCreateUrl from './api.controllers.js';

const router = Router();
router
    .get('/', async (req, res) => {
        res.json('hello')
    })
    .post('/', apiCreateUrl)



export default router;