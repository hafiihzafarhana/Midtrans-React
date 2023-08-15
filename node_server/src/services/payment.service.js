import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();

export async function processTransactionService(body) {
  const snap = new midtransClient.Snap({
    isProduction: JSON.parse(process.env.MIDTRANS_IS_PRODUCTION),
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });
  const parameter = {
    transaction_details: {
      order_id: body.order_id,
      gross_amount: body.total,
    },
    customer_details: {
      first_name: body.name,
    },
  };
  try {
    const transaction = await snap.createTransaction(parameter);
    let transactionToken = transaction.token;
    let dataPayment = {
      response: JSON.stringify(transaction),
    };
    return { token: transactionToken, data: dataPayment };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
