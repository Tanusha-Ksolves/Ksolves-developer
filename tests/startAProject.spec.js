const { test } = require("@playwright/test");
const {POManager} = require("../Page Objects/POManager");

test("Start a Project page", async ({ page }) => {

    const character = 'i';

    const poManager = new POManager(page);

    const startProjectPage = poManager.getStartProjectpage();

    await startProjectPage.goToWebsite();
    await startProjectPage.goToStartProjectPage();
    await startProjectPage.startProjectFillFields(character);

    const result = await startProjectPage.calculateCaptcha();
    console.log("Captcha result: "+ result);
    await startProjectPage.startProjectFillCaptcha(result);

    await startProjectPage.submitStartProjectForm();
    await startProjectPage.checkingSubmitConfirmation();
  
  
});


