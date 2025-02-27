// @ts-check
const {test,expect} = require('@playwright/test');
const { TIMEOUT } = require('dns');


test('createOrder', async ({browser}) => {
    

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://51.91.73.235:4000/wp-admin/edit.php?post_type=shop_order");

  const userName = page.locator('#user_login');
  const userPassword = page.locator("#user_pass");
  const signIn = page.locator('#wp-submit');
 
  
//login
  await userName.fill("Gaurav_ksolves");
  await userPassword.fill("ksolves@123");
  await signIn.click();

for(let i=1 ; i<1000; i++){
  
  
  await page.locator("//a[@class='page-title-action']").click({timeout : 50000});
  await page.locator("//span[@id='select2-customer_user-container']").click();
  await page.locator("//span/input[@class='select2-search__field']").fill("7",{timeout: 3000});
  await page.locator("//li[text()='Sumit Huria (#7 – sunit.huria@ksolves.com)']").click();
  
  await page.locator("//button[@class='button add-line-item']").click();
  await page.locator("//button[@class='button add-order-item']").click();
  await page.locator("//span[@class='select2-selection__placeholder']").click();
  await page.locator("//span/input[@class='select2-search__field']").fill("abc",{timeout : 3000});
  await page.locator("//li[text()='abcd1 (#3839) – Stock: 0']").click();
  await page.locator("//input[@class='quantity']").first().fill("4");

  await page.locator("//button[@id='btn-ok']").click({timeout : 5000});

  await page.locator("//button[@class='button add-line-item']").click();
  await page.locator("//button[@class='button add-order-item']").click();

  await page.locator("//span[@class='select2-selection__placeholder']").click();
  await page.locator("//span/input[@class='select2-search__field']").fill("abc",{timeout : 3000});

  await page.locator("//li[text()='Pro 556 2 (ABCD) – Stock: 0']").click();

  await page.locator("//button[@id='btn-ok']").click({timeout : 5000});

  //await page.pause();

  await page.locator("//button[text()='Recalculate']").click();
  await page.keyboard.press("Enter");
  

  await page.locator("//select[@id='order_note_type']").click()

  await page.keyboard.press("ArrowDown");

  await page.locator("//textarea[@name='order_note']").fill("Order "+ i);
  console.log("Order Created : " + i );

  

  //await page.pause();
  await page.locator("//button[text()='Create']").click({timeout : 40000});

}
}


);


