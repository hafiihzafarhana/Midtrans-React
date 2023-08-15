import { handleServerError } from "../exception/error.js";
import { processTransactionService } from "../services/payment.service.js";
import { StatusCodes as status } from "http-status-codes";
import { OK_200_response } from "../utils/apiResponse.util.js";

export async function processTransactionController(req, res) {
  const body = req.body;
  try {
    const service = await processTransactionService(body);
    console.log(2);
    res
      .status(status.OK)
      .json(OK_200_response("Transaction is success", "OK", service));
  } catch (error) {
    handleServerError(res, error);
  }
}
