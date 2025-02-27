const { test } = require("@playwright/test");
const {POManager} = require("../Page Objects/POManager");

test("Contact Us page", async ({ page }) => {

    const character = 'i';

    const poManager = new POManager(page);

    const contactUsPage = poManager.getContactUsPage();

    await contactUsPage.goToWebsite();
    await contactUsPage.goToContactUspage();
    await contactUsPage.contactUsFillFields(character);
    const result = await contactUsPage.calculateCaptcha();
    await contactUsPage.contactUsFillCaptcha(result);

    await contactUsPage.submitContactUSForm();
    await contactUsPage.checkingSubmitConfirmation();
  
  
});


