import express from "express";
import { routerLoader } from "./routerLoader.js";

const app = express();

app.use(express.json());

routerLoader(app);

app.listen(8080, () => {
  console.log("Server app running on port 8080!");
});
