const { chromium } = require("playwright");

module.exports = async (req, res) => {
  // Ustawienie nagłówków CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Można zastąpić '*' konkretną domeną, np. 'https://intiaro-front-end.vercel.app'
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Obsługuje preflight request
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { transforms, username, password } = req.body;
    try {
      await runPlaywrightScript(transforms, username, password);
      res.status(200).send("Transforms submitted successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error submitting transforms.");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

async function runPlaywrightScript(transforms, username, password) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://intiaro.agitest.pl/admin/products/matrix/add");
  await page.fill("input#id_username", username);
  await page.fill("input#id_password", password);
  await page.click("input[type=submit]");

  for (let transform of Object.keys(transforms)) {
    for (let params of Object.keys(transforms[transform])) {
      let formFields = [];
      if (params === "Position") {
        formFields = ["position_x", "position_y", "position_z"];
      } else if (params === "Rotation") {
        formFields = ["rotation_x", "rotation_y", "rotation_z"];
      } else if (params === "Scale") {
        formFields = ["scale_x", "scale_y", "scale_z"];
      }

      for (let i = 0; i < formFields.length; i++) {
        const field = formFields[i];
        const value = transforms[transform][params][i];
        await page.fill(`input[name='${field}']`, value.toString());
      }
    }
    await page.click("input[type=submit][name=_addanother]");
  }

  await browser.close();
}
