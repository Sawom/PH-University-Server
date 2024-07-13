import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./app/routes";
const app: Application = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// application routes. /api/v1/students ei route e gele student.routes e cole ashbe.
// zetay */create-student* ache
app.use("/api/v1", router );

const getController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getController);

export default app;
