const {expect} = require('@playwright/test');

class ContactUsPage{
    constructor(page){
        this.page=page;
        this.contactUsButton = this.page.getByRole("button", { name: "Contact Us" });
        this.fullName = this.page.getByRole("textbox", { name: "Full Name", exact: true });
        this.confirmationModal = this.page.locator("#conformationModel").getByRole("button");
        this.emailAddress = this.page.getByRole("textbox", { name: "Email Address", exact: true });
        this.dropdownIcon = this.page.locator("//div[@class = 'iti-arrow']");
        this.countryList = this.page.locator("//ul[@class='country-list']");
        this.selectCountry = this.countryList.locator("//li[@data-country-code='in']");
        this.contactInfo = this.page.getByRole("textbox", { name: "Contact Info", exact: true });
        this.message = this.page.getByRole("textbox", { name: "Message", exact: true });
        this.firstNumberLocator = this.page.locator("//input[@name[contains(.,'dscf7_hidden_val1-ksolmathcap')]]").nth(1);
        this.secondNumberLocator = this.page.locator("//input[@name[contains(.,'dscf7_hidden_val2-ksolmathcap')]]").nth(1);
        this.operationLocator = this.page.locator("//input[@name[contains(.,'dscf7_hidden_action-ksolmathcap')]]").nth(1);
        this.answerInput = this.page.locator("//input[@placeholder='Type your answer']").nth(1);
        this.confimationMessage = this.page.locator(".wpcf7-response-output").nth(1);

    }

    async goToWebsite(){
        await this.page.goto("https://developer.ksolves.net/");
        await this.page.waitForLoadState("load");
        await this.confirmationModal.click();
    }


    async goToContactUspage(){
        await this.contactUsButton.click();
    }

    async contactUsFillFields(character){
        
        await this.fullName.click();
        await this.fullName.fill("test automation");
        await this.emailAddress.click();
        await this.emailAddress.fill("test.automation@gmail.com");
        await this.dropdownIcon.nth(1).click(); 
        await this.countryList.waitFor({ state: "visible" });
        await this.page.keyboard.press(character);
        await this.selectCountry.click();
        await this.contactInfo.fill("919876543210");
        await this.message.fill("I'm filling the Contact Us page");
    }

    async calculateCaptcha(){
        const firstNumber = parseInt(await this.firstNumberLocator.getAttribute('value'));
        const secondNumber = parseInt(await this.secondNumberLocator.getAttribute('value'));
        const operation = await this.operationLocator.getAttribute('value');
  
  // Perform calculation
        let result;
        if (operation === "+") {
            result = firstNumber + secondNumber;
        } else if (operation === "-") {
            result = firstNumber - secondNumber;
        } else if (operation === "x" || operation === "×") {
            result = firstNumber * secondNumber;
        } else if (operation === "/") {
            result = firstNumber / secondNumber;
        }

        return result;
    }

    async contactUsFillCaptcha(result){
        await this.answerInput.fill(result.toString());
    }


    async submitContactUSForm(){
        await this.page.keyboard.press('Enter');
    }

    async checkingSubmitConfirmation(){
        await expect(this.confimationMessage).toHaveText("Thank you for your message. It has been sent.");
    }
}

module.exports = {ContactUsPage};