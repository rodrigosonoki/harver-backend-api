const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

require("dotenv/config");

const authRoute = require("./app/routes/auth");
const leadRoute = require("./app/routes/lead");

const PORT = 3001;

const app = express();

//OPTS
app.use(express.json());
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

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
