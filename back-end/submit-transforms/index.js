const { chromium } = require("playwright");

async function runPlaywrightScript(transforms, username, password) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Logowanie
  await page.goto("https://intiaro.agitest.pl/admin/products/matrix/add");
  await page.fill("input#id_username", username);
  await page.fill("input#id_password", password);
  await page.click("input[type=submit]");

  // Przesyłanie transformacji
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

module.exports = { runPlaywrightScript };
