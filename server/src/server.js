const express = require("express");
(require('dotenv')).config();
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");

const server = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('[server]: Connected to MongoDB');
}).catch(err => console.log(`[server]: Error connecting to MongoDB \n[server]: ${err}`));

server.use(cors());
server.use(express.urlencoded({extended: false}));
server.use(express.json());

server.use('/api/users/', usersRoute);

server.listen(PORT, () => {
  console.log(`[server]: 🚀 Server running at port: ${PORT}`);
});