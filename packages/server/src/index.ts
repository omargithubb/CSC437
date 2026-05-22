// src/index.ts
import express, { Request, Response } from "express";

import Routes from "./services/route-svc.js";

import { connect } from "./services/mongo.ts";

import routeRouter from "./routes/routes.ts";



connect("omar"); // use your own db name here

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.use("/api/routes", routeRouter);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

