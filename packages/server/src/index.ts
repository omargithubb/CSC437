import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import { connect } from "./services/mongo.ts";
import routeRouter from "./routes/routes.ts";
import auth, { authenticateUser } from "./routes/auth.js";

connect("omar");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);
app.use("/api/routes", authenticateUser, routeRouter);

// SPA deep-linking: serve index.html for any /app/... URL
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" })
    .then(html => res.send(html))
    .catch(() => res.status(404).send("Not found"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});