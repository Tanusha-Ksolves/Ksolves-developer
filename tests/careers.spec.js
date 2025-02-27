import { test, expect } from '@playwright/test';

test('Careers form submission', async ({ page }) => {
    // Navigate to the form page
    await page.goto('https://developer.ksolves.net/careers'); 
    await page.locator('a').filter({ hasText: 'Upload Your Resume' }).click();

    // Fill in the form fields
    await page.locator("[name='firstName']").fill("John");
    await page.locator("[name='lastName']").fill("Doe");
    await page.locator("[name='jobTitle']").fill("Software Engineer");
    await page.locator("[name='email']").fill("test.automate@example.com");
    await page.locator("[name='mobileNumber']").fill("9876543210");

    // Upload a file (Make sure the file path is correct)
    await page.setInputFiles("#file", "/home/tanushaksi159/Downloads/Calgary_Tower.pdf");
    await page.pause();
    
//FrameLocator represents a view to the iframe on the page. It captures the logic sufficient to retrieve the iframe and locate elements in that iframe. FrameLocator can be created with either locator.contentFrame(), page.frameLocator() or locator.frameLocator() method.
 await page.locator("iframe[title='reCAPTCHA']").first().contentFrame().locator(".recaptcha-checkbox-border").first().click();

    // Click the submit button (enable it first if disabled)
    // await page.evaluate(() => {
    //     document.querySelector("input[type='submit']").removeAttribute("disabled");
    // });
    await page.locator("input[type='submit']").first().click();

    // Verify success message
    await expect(page.locator(".wpcf7-response-output").first()).toHaveText("Thank you for your message. It has been sent.");
});

    


  
// // const siteKey = await page.$eval('.g-recaptcha', el => el.getAttribute('data-sitekey'));
// // console.log("reCAPTCHA Site Key:", siteKey);


// //  // Load API key from .env

// // const API_KEY = "11cc1362566539c2ac6dc6c0bcb76d05"; // Your 2Captcha API key

// // async function solveRecaptcha(siteKey, pageUrl) {
// //     try {
// //         // Step 1: Request CAPTCHA solving
// //         let response = await axios.get(`http://2captcha.com/in.php?key=${API_KEY}&method=userrecaptcha&googlekey=${siteKey}&pageurl=${pageUrl}&json=1`);
// //         let requestId = response.data.request;
// //         console.log("Captcha request ID:", requestId);

// //         // Step 2: Wait for the solution
// //         let solution;
// //         do {
// //             await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 sec before checking
// //             // Wait 5 sec
// //             let result = await axios.get(`http://2captcha.com/res.php?key=${API_KEY}&action=get&id=${requestId}&json=1`);
// //             solution = result.data.request;
// //         } while (solution === "CAPCHA_NOT_READY");

// //         console.log("Captcha Solved:", solution);
// //         return solution;
// //     } catch (error) {
// //         console.error("Error solving CAPTCHA:", error);
// //         return null;
// //     }
// // }

// //     // Solve CAPTCHA using 2Captcha
// //     const captchaToken = await solveRecaptcha(siteKey, pageUrl);

// //     if (captchaToken) {
// //         // Inject the solved CAPTCHA response
// //         await page.evaluate(token => {
// //             document.querySelector('#g-recaptcha-response').value = token;
// //         }, captchaToken);

// //         console.log("CAPTCHA response injected successfully.");

// //         // Submit the form (modify this based on your site)
// //         //await page.click('#submit-button');
// //     } else {
// //         console.log("Failed to solve CAPTCHA.");
// //     }

// //     // Keep the browser open for debugging
// //     await page.waitForTimeout(5000);
// //     await page.close();
// });

