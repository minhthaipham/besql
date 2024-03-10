const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", require("./router/auth"));
app.use("/product", require("./router/product"));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
