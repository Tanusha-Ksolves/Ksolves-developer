import { test } from '@playwright/test';
const {POManager} = require("../Page Objects/POManager");

test('Careers form submission', async ({ page }) => {
    const poManager = new POManager(page);

    const careerPage = poManager.getCareersPage();
    
    await careerPage.goToWebsite();
    await careerPage.goToCareerspage();
    await careerPage.careerFillFields();
    await careerPage.uploadFile();
    await careerPage.verifyCaptcha();

    await careerPage.submitCareersForm();
    await careerPage.checkingSubmitConfirmation();

}

);



