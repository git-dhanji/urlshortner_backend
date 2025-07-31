

import { Router } from "express";



const router = Router();
import { createOrder,verifyPayments } from "./payment.controllers.js";

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayments);

export default router