

import { Router } from 'express'
import apiCreateUrl from './api.controllers.js';

const router = Router();
router
    .get('/', async (req, res) => {
        res.json({
            message: `hello create your short links : ${process.env.APP_URI}/dev/c-links (method : post ) and body must have a { url }`
        })
    })
    .post('/', apiCreateUrl)



export default router;