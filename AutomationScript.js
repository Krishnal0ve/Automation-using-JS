//node AutomationScript.js --url="https://www.hackerrank.com" --config="config.json"

let puppeteer = require("puppeteer");
let fs = require("fs");
let minimist = require("minimist");
const { runMain } = require("module");

let args = minimist(process.argv);

let configJSON  = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);

run();

async function run(){
    //start the browser
     let browser = await puppeteer.launch({
         defaultViewport : null,
         args:  [
             "--start-maximized"
         ],
         headless : false
           });

     //get a tab
     let pages = await browser.pages();
     let page = pages[0];

     // go to url
     await page.goto(args.url);

     //click on login1
     await page.waitForSelector("a[data-event-action = 'Login']");
     await page.click("a[data-event-action = 'Login']");
     
     //click on login2
     await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
     await page.click("a[href='https://www.hackerrank.com/login']");

     //type userid
     await page.waitForSelector("input[name='username']");
     await page.type("input[name='username']",configJSO.userid);
     
     //type password
     await page.waitForSelector("input[name='password']");
     await page.type("input[name='password']",configJSO.password);

     //click on login3
     await page.waitForSelector("button[data-analytics='LoginPassword']");
     await page.click("button[data-analytics='LoginPassword']");

     //compete
     await page.waitForSelector("a[href='/contests']");
     await page.click("a[href='/contests']");

     //manage contests
     await page.waitForSelector("a[href='/administration/contests/']");
     await page.click("a[href='/administration/contests/']");
}

