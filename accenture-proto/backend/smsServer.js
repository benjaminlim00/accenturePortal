const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const client = require("twilio")(
  "ACa2ca31f005a220338a079b9df6d9f067",
  "a72a525ce86807da14b3dcfb2271992d"
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post("/api/messages", (req, res) => {
  res.header("Content-Type", "application/json");
  client.messages
    .create({
      from: "+1 810 250 7730",
      to: "+6591684317", //rmb to hide, dont upload to github
      body: "A new request has been created"
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(3001, () =>
  console.log("Express server (SMS sender) is running on localhost:3001")
);
