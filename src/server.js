const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

const authRoute = require("./app/routes/auth");
const leadRoute = require("./app/routes/lead");

const app = express();

//OPTS
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

//CONNECT TO MONGODB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log(`Connected to MongoDB on ${process.env.ENV} environment.`)
);

//ROUTES
app.use("/user", authRoute);
app.use("/lead", leadRoute);

app.listen(process.env.PORT || 3333, () => console.log("Server is running..."));
