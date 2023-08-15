import indexRoute from "./routes/index.js";
import paymentRoute from "./routes/payment.js";

const routes = [
  { model: indexRoute, base: "" },
  { model: paymentRoute, base: "payments" },
];

export default routes;
