const { test, expect } = require("@playwright/test");

test("Contact Us page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://developer.ksolves.net/");
 
  await page.waitForLoadState("load");

  expect(await page.screenshot()).toMatchSnapshot("landing.png");
  await page.getByRole("button", { name: "Contact Us" }).click();
  await page.getByRole("textbox", { name: "Full Name", exact: true }).click();

  //   if(await page.locator('#conformationModel').getByRole('button')){
  //     await page.locator('#conformationModel').getByRole('button').click();
  //   }

  await page.locator("#conformationModel").getByRole("button").click();
  await page.getByRole("textbox", { name: "Full Name", exact: true }).fill("test automation");
  await page.getByRole("textbox", { name: "Email Address", exact: true }).click();
  await page.getByRole("textbox", { name: "Email Address", exact: true }).fill("test.automation@gmail.com");
  await page.locator("//div[@class = 'iti-arrow']").nth(1).click();
  const countryList = await page.locator("//ul[@class='country-list']");
  await countryList.waitFor({ state: "visible" });
  await page.keyboard.press("i");
  await countryList.locator("//li[@data-country-code='in']").click();
  
  await page.getByRole("textbox", { name: "Contact Info", exact: true }).fill("-1234-5678-905454");
  await page.getByRole("textbox", { name: "Message", exact: true }).fill("test.automation@gmail.com");

  //Define variables

  const firstNumberLocator = page.locator("//input[@name[contains(.,'dscf7_hidden_val1-ksolmathcap')]]").nth(1);
  const secondNumberLocator = page.locator("//input[@name[contains(.,'dscf7_hidden_val2-ksolmathcap')]]").nth(1);
  const operationLocator = page.locator("//input[@name[contains(.,'dscf7_hidden_action-ksolmathcap')]]").nth(1);
  
  // Extract values
  const firstNumber = parseInt(await firstNumberLocator.getAttribute('value'));
  const secondNumber = parseInt(await secondNumberLocator.getAttribute('value'));
  const operation = await operationLocator.getAttribute('value');
  
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

  console.log(`Captcha: ${firstNumber} ${operation} ${secondNumber} = ${result}`);

  
  // Enter the answer
  const answerInput = page.locator("//input[@placeholder='Type your answer']").nth(1);
 
  await answerInput.fill(result.toString());
  await answerInput.screenshot({path: "partialScreenshot.png"});
  await page.screenshot({path: "screenshot.png"});

  //await page.locator("//div[contains(@class,'footer-submit')]/p/input[@type='submit']").nth(1).click();
  
});


