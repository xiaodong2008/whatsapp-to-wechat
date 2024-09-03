const express = require("express");
const app = express();
const port = 3183;
const password = process.env.PASSWORD;

app.post("/sendMsg", (req, res) => {
  if (req.query.password !== password) {
    res.status(401).send("Unauthorized");
    return;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
