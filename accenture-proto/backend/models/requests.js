const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  requester: String,
  asset: String,
  type: String,
  subject: String,
  dateRequested: String,
  priority: String,
  status: String,
  assigned: String
}); //id not needed. Mongo auto add.

module.exports = mongoose.model("Request", requestSchema);
