const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    whatsapp: String,
  },
  { collection: "leads" }
);

module.exports = mongoose.model("Lead", leadSchema);
