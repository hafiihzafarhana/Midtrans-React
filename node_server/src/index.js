import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./server.js";

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000;
console.log(process.env.MIDTRANS_IS_PRODUCTION);

routes.forEach((route) => {
  app.use(`/api/${route.base}`, route.model);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running in PORT ${PORT}`);
});
