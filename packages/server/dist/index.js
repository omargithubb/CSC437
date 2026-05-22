// src/index.ts
import express from "express";
import { connect } from "./services/mongo.js";
import routeRouter from "./routes/routes.js";
connect("omar"); // use your own db name here
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));
app.use("/api/routes", routeRouter);
app.get("/hello", (req, res) => {
    res.send("Hello, World");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
