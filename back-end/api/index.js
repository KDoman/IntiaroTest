const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const { runPlaywrightScript } = require("./playwright-script");

const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

module.exports = app;

app.use(
  cors({
    origin: "*",
  })
);
// app.use(bodyParser.json());

// app.post("/transforms", async (req, res) => {
//   const { transforms, username, password } = req.body;

//   try {
//     await runPlaywrightScript(transforms, username, password);
//     res.status(200).send("Transforms submitted successfully.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error submitting transforms.");
//   }
// });

app.post("/transforms", (req, res) => {
  runPlaywrightScript();
});

app.listen(3000, (req, res) => {
  console.log("runnig");
});
