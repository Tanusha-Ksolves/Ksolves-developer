import { test } from '@playwright/test';
const {POManager} = require("../Page Objects/POManager");


test("Checking UI of the Join US form", async({page})=>{
    const poManager = new POManager(page);
    const uiCareerPage = poManager.getCareersPage();
    await uiCareerPage.goToWebsite();
    await uiCareerPage.checkUI();

});

test.only('Join Us submission form on careers page', async ({ page }) => {
    const poManager = new POManager(page);

    const careerPage = poManager.getCareersPage();
    
    await careerPage.goToWebsite();
    await careerPage.goToCareerspage();
    await careerPage.careerFillFields();
    await careerPage.uploadFile();
    await careerPage.verifyCaptcha();

    await careerPage.submitCareersForm();
    await careerPage.checkingSubmitConfirmation();   

});

test('Apply now form', async ({ page }) => {
    const poManager = new POManager(page);

    const applyNowPage = poManager.getApplyNowPage();
    await applyNowPage.goToWebsite();

    const profile = await applyNowPage.getJobTitle();
    console.log("Profile name: "+profile);

    await applyNowPage.clickApplyNow();
    await page.waitForLoadState("networkidle");
    await applyNowPage.fillApplyForThisJobForm();
    await applyNowPage.checkJobTitle(profile);
    await applyNowPage.uploadFile();
    await applyNowPage.verifyCaptcha();
    await applyNowPage.submitCareersForm();
    await applyNowPage.checkingSubmitConfirmation();

    await applyNowPage.viewJobDescription();
}

);



