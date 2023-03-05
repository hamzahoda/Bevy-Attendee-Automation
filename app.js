const puppeteer = require('puppeteer-extra');
const express = require('express');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const XLSX = require('xlsx');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {


  let workbook = XLSX.readFile(process.env.FILE_NAME);
  let sheet_name_list = workbook.SheetNames;
  let headers;
  let data;

  sheet_name_list.forEach((y) => {
      let worksheet = workbook.Sheets[y];
      let tempHeaders = {};
      let tempData = [];
      for(z in worksheet) {
          if(z[0] === '!') continue;
          //parse out the column, row, and value
          let col = z.substring(0,1);
          let row = parseInt(z.substring(1));
          let value = worksheet[z].v;
  
          // console.log("col",col)
          // console.log("row",row)
          // console.log("row",row)

          //store header names
          if(row == 1) {
              tempHeaders[col] = value;
              continue;
          }
  
          if(!tempData[row]) tempData[row]={};
          tempData[row][tempHeaders[col]] = value;
      }
      //drop those first two rows which are empty
      tempData.shift();
      tempData.shift();
      data = tempData
      headers = headers
  });



// For avoiding error --> not a secure browser
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 

  await page.setExtraHTTPHeaders({
      'accept-language': 'en-US,en;q=0.9,hy;q=0.8'
  });
  await page.goto(process.env.DASHBOARD_LINK);
  await page.waitForSelector('input[type="email"]')
  await page.type('input[type="email"]', process.env.EMAIL);
  await Promise.all([
      page.waitForNavigation(),
      await page.keyboard.press('Enter')
  ]);
  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', process.env.PASSWORD);

  const res = await Promise.all([
    page.waitForNavigation(),
    await page.keyboard.press('Enter')
  ]);

  await page.setDefaultNavigationTimeout(0); 

  await page.goto(process.env.LIVE_EVENT_LINK)
  page.waitForNavigation()


  const node = await page.waitForSelector('aria/Add attendee')
  await node.click()
  
  
  for(i=0;i<data.length;i++){
    
    fname = data[i]["first name"]
    lname = data[i]["last name"]
    email = data[i]["email"]
    await page.type('input[name="first_name"]', fname);
    await page.type('input[name="last_name"]', lname);
    await page.type('input[name="email"]', email);
    const node2 = await page.waitForSelector('aria/Save and add more')
    await page.waitForTimeout(2000)
    await node2.click()
    await page.waitForTimeout(2000)
    
    // If wrong email is entered or email already taken clear the fields
    const input1 = await page.$('input[name="first_name"]');
    await input1.click({ clickCount: 3 })
    await page.keyboard.press('Backspace')
    const input2 = await page.$('input[name="last_name"]');
    await input2.click({ clickCount: 3 })
    await page.keyboard.press('Backspace')
    const input3 = await page.$('input[name="email"]');
    await input3.click({ clickCount: 3 })
    await page.keyboard.press('Backspace')

    await page.waitForTimeout(2000)

  }

  await page.waitForTimeout(1000)

})()


app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});