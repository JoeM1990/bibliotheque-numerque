import express from "express";
import booksRoutes from "./routes/books.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// BOOKS
app.use("/backend/books", booksRoutes);

// USERS
app.use("/backend/users", usersRoutes);

// AUTH
app.use("/backend/auth", authRoutes);

// BACKEND CONFIG

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.log("Connected to backend.");
});

app.get("/test", (req, res) => {
  res.json("It works !");
});
