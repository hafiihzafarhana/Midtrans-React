import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to access midtrans",
    status: "OK",
  });
});

export default router;
