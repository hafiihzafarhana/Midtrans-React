import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
// import env from "../configuration/env";
import axios from "axios";

function HomeView() {
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [total, setTotal] = useState(0);

  const [token, setToken] = useState("");

  const sendHandler = async () => {
    const data = {
      name,
      orderId,
      total,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `http://localhost:5000/api/payments/process-transaction`,
      data,
      config
    );

    // console.log(response.data.data.data.response, response.data.data.token);
    setToken(response.data.data.token);
  };

  useEffect(() => {
    if (token) {
      console.log(token);
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("masuk 1");
          alert("payment success!");
          console.log(result);
          localStorage.setItem("pembayaran", JSON.stringify(result));
          setToken("");
        },
        onPending: (result) => {
          console.log("masuk 2");
          alert("wating your payment!");
          console.log(result);
          localStorage.setItem("pembayaran", JSON.stringify(result));
          setToken("");
        },
        onError: (error) => {
          console.log("masuk 3");
          alert("payment failed!");
          console.log(error);
          setToken("");
        },
        onClose: function () {
          console.log("masuk 4");
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
          setToken("");
        },
      });
      console.log("masuk 5");
      setName("");
      setOrderId("");
      setTotal(0);
    } else {
      console.log(2);
    }
  }, [token]);

  useEffect(() => {
    console.log("masuk 6");
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    console.log("masuk 7");
    let scriptTag = document.createElement("script");
    console.log("masuk 8");
    scriptTag.src = midtransUrl;
    console.log("masuk 9");
    const midtransClientKey = "Mid-client-sor1dlAlNlE2y4NO";
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    console.log("masuk 10");
    document.body.appendChild(scriptTag);
    console.log("masuk 11");
    return () => document.body.removeChild(scriptTag);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "93vw",
        padding: 4,
      }}
    >
      <TextField
        label="Name"
        type="text"
        variant="outlined"
        value={name}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Order ID"
        type="text"
        variant="outlined"
        value={orderId}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <TextField
        label="Total"
        type="number"
        variant="outlined"
        value={total}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setTotal(e.target.value)}
      />

      <Box>
        <Button variant="contained" onClick={sendHandler}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default HomeView;
