import express from "express";
import output from "./output.js";
import { setupWechat } from "./wechat.js";

const app = express();
const port = 3183;
const password = process.env.PASSWORD;

app.listen(port, () => {
  output.status(`Web server started: ${port}`);
});

app.post("/sendMsg", (req, res) => {
  output.log("Received a request to send a message:", req.body);
  if (req.body.password !== password) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { msg } = req.body;
  output.log(`Try to forward message: ${msg}`);
  wechat.send(msg);
  res.send("OK");
});

const wechat = setupWechat();
