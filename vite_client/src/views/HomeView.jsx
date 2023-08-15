import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import env from "../configuration/env";
import axios from "axios";

function HomeView() {
  const [name, setName] = useState("");
  const [order_id, setOrder_id] = useState("");
  const [total, setTotal] = useState(0);

  const [token, setToken] = useState("");

  const sendHandler = async () => {
    const data = {
      name,
      order_id,
      total,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${env.REACT_APP_BE_URL}/payments/process-transaction`,
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
          localStorage.setItem("pembayaran", JSON.stringify(result));
        },
        onPending: (result) => {
          localStorage.setItem("pembayaran", JSON.stringify(result));
        },
        onError: (error) => {
          console.log(error);
        },
        onClose: function () {
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;
    scriptTag.setAttribute(
      "data-client-key",
      env.VITE_REACT_APP_MIDTRANS_CLIENT_KEY
    );
    document.body.appendChild(scriptTag);
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
        value={order_id}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setOrder_id(e.target.value)}
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
