const {POManager} = require("../Page Objects/POManager");
const {test, expect} = require('@playwright/test');

test('Validating the Home page', async ({page}) => {
    await page.goto("https://developer.ksolves.net/");

    const confirmationModal = page.locator("#conformationModel").getByRole("button");
    await confirmationModal.click();


//checking email is clickable and the url.
    const emailLink = page.locator("//a[@class='text-white me-2']");
    await expect(emailLink).toBeVisible();
    //await emailLink.click();
  
    // checking the href is a mailto: link
    const emailhref = await emailLink.getAttribute('href');
    await expect(emailhref).toContain('mailto:contact@ksolves.com');
    console.log("Email is clickable")

//checking phone number
    const phoneNumber1 = page.locator("//a[@class = 'text-white number1']");
    const phoneNumber2 = page.locator("//a[@class = 'text-white number2']");

    await expect(phoneNumber1).toBeVisible();
    await expect(phoneNumber2).toBeVisible();

    // await phoneNumber1.click();
    // await page.keyboard.press('Enter');
    // await phoneNumber2.click();
    // await page.keyboard.press('Enter');

    const phoneNo1href = await phoneNumber1.getAttribute('href');
    const phoneNo2href = await phoneNumber2.getAttribute('href');

    await expect(phoneNo1href).toContain("tel:+91 1800 121 0218");
    await expect(phoneNo2href).toContain("tel:+1 (646) 203-1075");

    console.log("Phone numbers are clickable")

    //await confirmationModal.click();


//checking whatsapp button and the URL.
    const whatsappLink = page.locator("//button[@class = 'btn whatsaap-icon-header d-flex align-items-center justify-content-center p-0']");
    await expect(whatsappLink).toBeVisible();
    //await whatsappLink.click();

     // checking the href is a whatsapp.com
     const whatsapphref = await whatsappLink.getAttribute('href');
     await expect(whatsapphref).toContain('api.whatsapp.com/send');
     console.log("whatsaap is clickable");

     //await confirmationModal.click();

//Nav items
    const navBarItems = page.locator("//li[contains(@class,'menu-dropdown nav-item has-mega-menu')]");
    const noOfNavItems = await navBarItems.count();
    console.log(noOfNavItems);

    //for(const item of noOfNavItems){
    for(let i = 0; i< noOfNavItems; i++){
        const textOfItem = await navBarItems.nth(i).locator("//div[@class = 'nav-div']/a[@class='text-dark font-15 inactiveLink']").textContent();
        console.log("Nav headers : "+textOfItem);
        const itemOptions = await navBarItems.nth(i).locator("//div/div/div/ul/li[@class = 'py-2 col-12 px-3']");
        const itemOptionsCount = await itemOptions.count(); 
        console.log("itemOptionsCount : " +itemOptionsCount);

        
        for(let j=0 ; j<itemOptionsCount ; j++){
            await navBarItems.nth(i).hover();
            const optionValue = await itemOptions.nth(j).textContent();
            console.log("Option value : "+optionValue);
            const optionLink = await itemOptions.nth(j);
            //await expect(optionLink).toBeVisible();
            await optionLink.click();

            console.log(optionValue+" option is clickable");

       }
    }

    await page.locator("//a[text() = 'Investors and News']").click();

    //checking header logo
    const headerLogo = page.locator("//a[@class = 'position-relative header-logo']");
    await expect(headerLogo).toBeVisible();
    await headerLogo.click();
    const headerLogohref = await headerLogo.getAttribute('href');
    await expect(headerLogohref).toContain('/');
    console.log("headerLogo is clickable")
    await confirmationModal.click();

//checking the video is properly loaded or visible.
    const video = page.locator('video[autoplay][muted][playsinline]').last();
    await expect(video).toBeVisible();

    // Extract source URL
    const videoSrc = await video.locator('source[type="video/mp4"]').getAttribute('src');
    console.log('Video source:', videoSrc);
    expect(videoSrc).toContain('Website-Video-3-2.mp4'); 
    console.log("video is loaded and visible properly");


//Start a project

    const character = 'i';

    const poManager = new POManager(page);

    const startProjectPage = poManager.getStartProjectpage();

    await startProjectPage.goToWebsite();
    await startProjectPage.goToStartProjectPage();
    await startProjectPage.startProjectFillFields(character);

    const result1 = await startProjectPage.calculateCaptcha();
    console.log("Captcha result: "+ result1);
    await startProjectPage.startProjectFillCaptcha(result1);

    await startProjectPage.submitStartProjectForm();
    await startProjectPage.checkingSubmitConfirmation();
  
//Contact Us

    const contactUsPage = poManager.getContactUsPage();

    await contactUsPage.goToWebsite();
    await contactUsPage.goToContactUspage();
    await contactUsPage.contactUsFillFields(character);
    const result2 = await contactUsPage.calculateCaptcha();
    await contactUsPage.contactUsFillCaptcha(result2);

    await contactUsPage.submitContactUSForm();
    await contactUsPage.checkingSubmitConfirmation();


//Validating headers section
    
});


test.only('Validating the text content', async ({page}) => {
    await page.goto("https://developer.ksolves.net/");

    const confirmationModal = page.locator("#conformationModel").getByRole("button");
    await confirmationModal.click();

    const header = await page.locator("//h2[@class='service-technology-title']").textContent();
    console.log(header);
    await expect(header).toContain("Technology and Expertise");

    const serviceIcon = page.locator("//a[@class = 'ks-tooltip']");
    const serviceIconCount = await serviceIcon.count();
    for(let i=0 ; i<serviceIconCount ; i++){
        let serviceIconText = await serviceIcon.nth(i).textContent();
        console.log(serviceIconText);
        let resultTrim = serviceIconText.trim();
        let result = resultTrim.slice(0,2).toLowerCase();
        //let result = serviceIconText.split(" ");
        console.log("Trimed string: "+resultTrim);
        console.log("First 2 letter: "+result);
        const serviceIconhref = await serviceIcon.nth(i).getAttribute('href');
        console.log(serviceIconhref);
        await serviceIcon.nth(i).click({timeout: 10000});
        let title = await page.title();
        console.log(title);
        await expect(serviceIconhref).toContain(`/${result}`);
        
        //const pageHeader = await page.locator("//h1[contains(@class, 'font-40 f-w-700 mb-3  mt-lg-0 mt-3 text-left text-lg-start d-flex flex-wrap')]").textContent();
        //console.log(pageHeader);
        await page.goBack();
        await confirmationModal.click();

    }
        


    });





