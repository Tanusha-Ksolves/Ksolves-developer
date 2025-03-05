const {expect} = require('@playwright/test');

class ApplyNowPage{
    constructor(page){
        this.page = page;
        this.jobTitleContainer = this.page.locator("//summary[@data-target='#job1']").first();
        this.profileName = this.jobTitleContainer.locator("//h6[@class='mb-3 font-20 f-w-500']")
        this.applyNowButton = this.jobTitleContainer.locator("//span/a/h2[@class='btn mb-0 rounded-1 f-w-500 overflow-hidden btn-primary text-white btn-lg px-4 d-inline-flex align-items-center job-btn-2']");
        this.firstName = this.page.locator("[name='firstName']");
        this.lasName  = this.page.locator("[name='lastName']");
        this.jobTitle = this.page.locator("//span[@data-name='jobTitle']/input[@placeholder='Job title']");
        this.email = this.page.locator("[name='email']");
        this.mobileNumber = this.page.locator("[name='mobileNumber']");
        this.captchaFrame = this.page.locator("iframe[title='reCAPTCHA']");
        this.submitButton = this.page.locator("//input[@class='wpcf7-form-control wpcf7-submit has-spinner w-50 footer-submit font-18 footer-form-sub btn btn-primary rounded-1 text-white text-center f-w-600 p-3 mt-md-4 mt-2']");
        this.confimationMessage = this.page.locator("//div[@class = 'wpcf7-response-output']").first();
        this.jobDescription = this.page.locator("//a[@class='go-back d-flex align-items-center justify-content-start mb-4']");

    }

    async goToWebsite(){
        await this.page.goto("https://developer.ksolves.net/careers");
        await this.page.waitForLoadState("load");
        
    }

    async getJobTitle(){
        const profile =  await this.profileName.textContent();
        return profile;
    }

    async clickApplyNow(){
        await this.applyNowButton.click();
    }

    async fillApplyForThisJobForm(){
        await this.firstName.fill("John");
        await this.lasName.fill("Doe");
        await this.email.fill("test.automate@example.com");
        await this.mobileNumber.fill("9876543210");
    }

    async checkJobTitle(profile) {

        const title = await this.jobTitle.inputValue();
        console.log(title);
        expect(title).toContain(profile);  // Simple and handles retries
        console.log("Job title is matching");
    }    

    async uploadFile(){
        await this.page.setInputFiles("#file", "/home/tanushaksi159/Downloads/Calgary_Tower.pdf");
    }
 
    async verifyCaptcha(){
        await this.captchaFrame.first().contentFrame().locator(".recaptcha-checkbox-border").first().click();
    }
 
    async submitCareersForm(){
        await this.submitButton.click({timeout : 5000});
        //await this.page.keyboard.press('Enter');
    }
     
    async checkingSubmitConfirmation(){
        // const text = await this.confimationMessage.getByRole('textbox');
        // console.log(text);
        await expect(this.confimationMessage).toHaveText("Thank you for your message. It has been sent.");
    }   

    async viewJobDescription(){
        const JDHref = await this.jobDescription.getAttribute('href');
        console.log(JDHref);
        await this.jobDescription.click();
        await expect(JDHref).toContain("/careers");
        console.log("Redirected to the correct URL");

    }

}

module.exports = {ApplyNowPage};