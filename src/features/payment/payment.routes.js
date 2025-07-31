

import { Router } from "express";



const router = Router();
import { createOrder,verifyPayments } from "./payment.controllers.js";

router.post('/create-order', createOrder);
<<<<<<< HEAD
router.post('/verify', verifyPayments);
=======
router.post('/verify-payment', verifyPayments);
>>>>>>> main

export default router