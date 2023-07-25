const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");
const documentRoute = require("./routes/documentRoute");
const adminRoute = require("./routes/adminRoute");

const server = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECTION_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("[server]: Connected to MongoDB");
  })
  .catch((err) =>
    console.log(`[server]: Error connecting to MongoDB \n[server]: ${err}`),
  );

server.use(cors());
server.use(express.urlencoded({ limit: "100mb", extended: false }));
server.use(express.json({ limit: "100mb" }));

server.use("/api/users/", usersRoute);
server.use("/api/document/", documentRoute);
server.use("/api/admin/", adminRoute);

server.listen(PORT, () => {
  console.log(`[server]: 🚀 Server running at port: ${PORT}`);
});
