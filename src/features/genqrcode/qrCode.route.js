


import { Router } from "express";
import qrCodeController from "./qrCode.controllers";

const router = Router();


router.post('/generate', qrCodeController)


export default router;