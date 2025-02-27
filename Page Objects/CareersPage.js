const {expect} = require('@playwright/test');

class CareersPage{
    constructor(page){
        this.page = page;
        this.uploadResume = this.page.locator('a').filter({ hasText: 'Upload Your Resume' });
        this.firstName = this.page.locator("[name='firstName']");
        this.lasName  = this.page.locator("[name='lastName']");
        this.jobTitle = this.page.locator("[name='jobTitle']");
        this.email = this.page.locator("[name='email']");
        this.mobileNumber = this.page.locator("[name='mobileNumber']");
        this.captchaFrame = this.page.locator("iframe[title='reCAPTCHA']");
        this.confimationMessage = this.page.locator(".wpcf7-response-output").nth(1);
    }

    async goToWebsite(){
        await this.page.goto("https://developer.ksolves.net/careers");
        await this.page.waitForLoadState("load");
    }


    async goToCareerspage(){
        await this.uploadResume.click();
    }

    async careerFillFields(){
        await this.firstName.fill("John");
        await this.lasName.fill("Doe");
        await this.jobTitle.fill("Software Engineer");
        await this.email.fill("test.automate@example.com");
        await this.mobileNumber.fill("9876543210");
    }

    async uploadFile(){
        await this.page.setInputFiles("#file", "/home/tanushaksi159/Downloads/Calgary_Tower.pdf");
    }

    async verifyCaptcha(){
        await this.captchaFrame.first().contentFrame().locator(".recaptcha-checkbox-border").first().click();
    }

    async submitCareersForm(){
        await this.page.keyboard.press('Enter');
    }
    
    async checkingSubmitConfirmation(){
        await expect(this.confimationMessage).toHaveText("Thank you for your message. It has been sent.");
    }
}



module.exports= {CareersPage};  