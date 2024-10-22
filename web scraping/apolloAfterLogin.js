
const puppeteer = require('puppeteer');
const fs = require('fs');

const path = require('path');
async function loginToApolloWithGmail() {
    const browser = await puppeteer.launch({
        headless: false, // Make sure the browser is not headless, so you can see it
        args: [
            '--window-size=1600,720',  // Set the size of the window (width, height)
            '--window-position=400,200'  // Set the position of the window (x, y)
        ],
        defaultViewport: null,  // Disable the default viewport settings
    });
    const page = await browser.newPage();
    
    // Set viewport to full-screen size (e.g., 1920x1080)
    await page.setViewport({ width: 1600, height: 720 });
// Load cookies
const cookiesPath = path.join(__dirname, 'cookies.json');
if (fs.existsSync(cookiesPath)) {
    const cookies = JSON.parse(fs.readFileSync(cookiesPath));
    for (let cookie of cookies) {
        await page.setCookie(cookie);
    }
    console.log('Cookies loaded.');
}

const url = 'https://app.apollo.io/#/people?finderViewId=6716264b3692ba02d378ace5&personTitles[]=owner&personTitles[]=ceo&personTitles[]=founder&personLocations[]=Canada&personLocations[]=United%20States&qOrganizationKeywordTags[]=e-commerce&includedOrganizationKeywordFields[]=tags&includedOrganizationKeywordFields[]=name';
    await page.goto(url, { waitUntil: 'domcontentloaded' });

// Load local storage data
const localStoragePath = path.join(__dirname, 'localStorage.json');
if (fs.existsSync(localStoragePath)) {
    const localStorageData = JSON.parse(fs.readFileSync(localStoragePath));

    // Convert the object to a JSON string before passing it to `page.evaluate`
    const localStorageDataStr = JSON.stringify(localStorageData);

    await page.evaluate((dataStr) => {
        const localStorageObj = JSON.parse(dataStr);
        for (let key in localStorageObj) {
            localStorage.setItem(key, localStorageObj[key]);
        }
    }, localStorageDataStr);

    console.log('Local storage loaded.');
}
    // Set a higher default timeout
    // await page.setDefaultNavigationTimeout(120000); // 2 minutes

    
    // await page.waitForSelector('div[role="row"]', { visible: true });

    await Promise.race([
        page.waitForSelector('div[role="row"]', { visible: true }),
        page.waitForSelector('tbody', { visible: true })
    ]);
    let obj = {};
    let flag = '';
    console.log('process.argv[2]',process.argv[2]);
    const tableData = await page.evaluate(async (obj,argv) => {
        
       let flagArr = [];
        let rows = '';
        const t = [document.querySelectorAll('table tr'),document.querySelectorAll('div[role="row"] input[type="checkbox"]')]
        
        if(t[0] != null){
            rows = Array.from(t[0])

        }
        if(t[1] != null){
            rows = Array.from(t[1])
        }
        
        // console.log('rows.length',rows.length);
        // rows.push('a');

        //  rows.map((row,i) => {
        //     if(rows.length-1 == i){
        //         return obj;
        //     }
        //     const cells = Array.from(row.querySelectorAll('th, td'));

        //     if(cells[3].innerText.trim() == "Access email" && cells[4].innerText.trim() == "Access Mobile"){
        //         flag = i+1;
        //         flagArr.push(i+1);
        //         return '';
        //     }
        // });

        // if(argv){
        //     if(argv == 'abc' && flagArr.length > 0){
        //         const lent = flagArr.length;
        //         for(let v = 0; v < lent; v++){
        //             let btn = document.querySelector("#main-app > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > div > div.finder-results-list-panel-content > div > div > div > div > div > div > div > table > tbody:nth-child("+flagArr[v]+")  > tr > td > div > div > label > div")
        //             if(btn != null){
        //                 btn.click()
        //             }
        //         }
        //     } else {
        //         for(let v = 2; v < 5; v++){
        //             let btn = document.querySelector("#main-app > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > div > div.finder-results-list-panel-content > div > div > div > div > div > div > div > table > tbody:nth-child("+v+")  > tr > td > div > div > label > div")
        //             if(btn != null){
        //                 btn.click()
        //             }
        //         }
        //      }
        // } else {
        //     document.querySelector("#main-app > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > div > div.finder-results-list-panel-content > div > div > div > div > div > div > div > table > tbody:nth-child("+flag+")  > tr > td > div > div > label > div").click()
        // }

        let abcd = 0
        for(let i = 1; i < rows.length; i++){
            t[1][i].click()
            abcd++
            if(abcd == 10){
                break;
            }
        }

        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         console.log("This message appears after 3 seconds.");
        //         document.querySelector("div[role='dialog'] > div > div > button:nth-child(5)").click();
        //         resolve(); // Resolves after the timeout.
        //     }, 10000); // 3000 milliseconds = 3 seconds
        // });
        // Simulate delays with async/await
    console.log('First action executed');
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Second action executed');
    document.querySelector("div[role='dialog'] > div > div > button:nth-child(5)").click();
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Third action executed');
    let b = [document.querySelector("body > div.apolloio-css-vars-reset > div > div > div > div > button:nth-child(1)"),
    document.querySelector("body > div.apolloio-css-vars-reset > div > div > div > div > button:nth-child(2) > div")
    ]
    console.log('adfadsfdsa',b);
    if(b[0] != null &&  (b[0].innerText == "Export records" || b[0].innerText == "Save")){
        b[0].click();
    } else {
        if(b[1] != null && (b[1].innerText == "Export records" || b[1].innerText == "Save")){
            b[1].click();
        }
    }
    await new Promise(resolve => setTimeout(resolve, 12000));

    console.log('Fourth action executed');
    document.querySelector("body > div.apolloio-css-vars-reset.zp.zp-modal > div > div > div > div > button").click();
        
        
        // for(let i = 0; i < 1000000; i++){
        //     let a = i;
        // }
        // document.querySelector("#id-pbdebe > div > div > button:nth-child(5) > span").click()
       
        // const button = Array.from(document.querySelectorAll('button'))
        // .find(el => el.textContent.trim() === 'Export');
        // console.log('dfddf',button);
        // if (button) {
        //     button.click();
        // }             
        return obj;
    }, obj,process.argv[2]);



     // Wait for the dialog with the role attribute to appear
    //  await page.waitForSelector('div[role="dialog"]');

    //  // Click the second button inside the dialog
    //  const buttons = await page.$$('div[role="dialog"] > div > div > div > button');
 
    //  // Check if there are buttons available and click the second one (index 1)
    //  if (buttons.length > 1) {
    //      await buttons[1].click();
    //      console.log('Clicked the second button inside the dialog.');
    //  } else {
    //     await page.evaluate(() => {
    //         const downbtn = document.querySelector("body > div.apolloio-css-vars-reset.zp.zp-modal > div > div > div > div > button:nth-child(2) > div")
    //         if(downbtn != null){
    //          downbtn.click()
    //         }
    //     }) 
    //      console.log('Button not found.');
    //  }


    //  // Wait for the dialog with the role attribute to appear
    //  await page.waitForSelector("body > div.apolloio-css-vars-reset.zp.zp-modal > div > div > div > div > button");

    //  // Click the second button inside the dialog
    //  await page.click("body > div.apolloio-css-vars-reset.zp.zp-modal > div > div > div > div > button");
    
    // //  // Wait for 1 second before closing the browser
    // await new Promise(resolve => setTimeout(resolve, 10000)); // 1000 milliseconds = 1 second
    // await page.waitForTimeout(10000); // Adjust for debugging purposes
    // await browser.close();
}

// Call the function
loginToApolloWithGmail();

