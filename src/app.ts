import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// application routes. /api/v1/students ei route e gele student.routes e cole ashbe.
// zetay */create-student* ache
// eta ekhn routes.ts e ache
app.use("/api/v1", router);

const getController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getController);

// **global error handler
app.use(globalErrorHandler);

// not found status
app.use(notFound);

export default app;
