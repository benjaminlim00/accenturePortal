const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow corss-origin requests
app.use(cors());
// app.use(
//   "/graphiql",
//   graphqlHTTP({
//     schema,
//     graphiql: true
//   })
// );

mongoose.connect(
  "mongodb+srv://benjamin:benpassword@cluster0-uykqv.mongodb.net/test?retryWrites=true"
);
mongoose.connection.once("open", () => {
  try {
    console.log("connected to database");
  } catch {
    console.log("connection failed...");
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema, //this is for the graph. not for mongoDB
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening to requests on port 4000");
});
