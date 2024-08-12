const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runPlaywrightScript } = require("./playwright-script");

const app = express();

app.use(cors());

app.use(bodyParser.json());

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
