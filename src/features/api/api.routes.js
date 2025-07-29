

import { Router } from 'express'
import apiCreateUrl from './api.controllers.js';

const router = Router();
router
    .get('/', async (req, res) => {
        res.json('hello')
    })
    .post('/links', apiCreateUrl)
    .delete('/links/:shortId', async (req, res) => {
        res.json({
            message: 'working on that',
        })
    })



export default router;