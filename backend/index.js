import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import dbConnection from "./config/dbConfig.js";
import router from "./routes/index.js";
import { seed } from "./utils/seed.js";
import passport from "passport";
import passportConfig from "./config/passportConfig.js";
import session from "express-session";

dotenv.config();

const app = express();

dbConnection();

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
passportConfig();

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(cors());

app.use(router);

//root URL response
app.get("/", (req, res) => {
  res.send("PatrickBackend ProposalAI API is running").status(200);
  //console.log("request received")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
