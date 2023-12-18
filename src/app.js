import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user/:nome", (req, res) => {
  res.send({
    user: req.params.nome,
  });
});

app.listen(8080, () => {
  console.log("Server app running on port 8080!");
});
