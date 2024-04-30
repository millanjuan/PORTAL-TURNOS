import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import routes from "./src/routes";
import dotenv from "dotenv";

dotenv.config();

import "./src/db/db";

const server = express();

// MIDDLEWARES
server.set("name", "API");
server.use(cors());
/*server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser()); */
server.use(morgan("dev"));
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//agregar server.use(rutas)
server.use("/api", routes);

// si hay algun error al hacer una solicitud lo devuelve
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = (err as any).status || 500;
  const message = (err as any).message || err;
  console.error(err);
  res.status(status).send(message);
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("Up on running");
});
