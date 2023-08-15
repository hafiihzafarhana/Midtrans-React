import express from "express";
import { processTransactionController } from "./../controllers/payment.controller.js";

const router = express.Router();

router.post("/process-transaction", processTransactionController);

export default router;
