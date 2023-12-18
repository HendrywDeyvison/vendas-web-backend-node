import express from "express";
import { routerLoader } from "./routerLoader.js";

const app = express();

routerLoader(app);

app.listen(8080, () => {
  console.log("Server app running on port 8080!");
});
