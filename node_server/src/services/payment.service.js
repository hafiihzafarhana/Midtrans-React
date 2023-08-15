import midtransClient from "midtrans-client";

export async function processTransactionService(body) {
  const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION,
    serverKey: "Mid-server-PBUrUaJGpr1QWIaxNkzLtOWz",
    clientKey: "Mid-client-sor1dlAlNlE2y4NO",
  });

  const parameter = {
    transaction_details: {
      order_id: body.orderId,
      gross_amount: body.total,
    },
    customer_details: {
      first_name: body.name,
    },
    enabled_payments: [
      "credit_card",
      "cimb_clicks",
      "bca_klikbca",
      "bca_klikpay",
      "bri_epay",
      "echannel",
      "permata_va",
      "bca_va",
      "bni_va",
      "bri_va",
      "cimb_va",
      "other_va",
      "gopay",
      "indomaret",
      "danamon_online",
      "akulaku",
      "shopeepay",
      "kredivo",
      "uob_ezpay",
    ],
  };

  try {
    const transaction = await snap.createTransaction(parameter);

    let transactionToken = transaction.token;
    let dataPayment = {
      response: JSON.stringify(transaction),
    };

    return { token: transactionToken, data: dataPayment };
  } catch (error) {
    throw error;
  }
}
