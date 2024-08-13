const express = require("express");
const bodyParser = require("body-parser");
const { runPlaywrightScript } = require("./playwright-script");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/submit-transforms", async (req, res) => {
  const { transforms, username, password } = req.body;
  try {
    await runPlaywrightScript(transforms, username, password);
    res.status(200).send("Transforms submitted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting transforms.");
  }
});

module.exports = app;
