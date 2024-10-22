
// const puppeteer = require('puppeteer');

// async function loginToApolloWithGmail() {
//     const browser = await puppeteer.launch({ headless: false }); // Launch in a visible mode to debug
//     const page = await browser.newPage();

//     const apolloLoginUrl = 'https://app.apollo.io/#/login';
//     await page.goto(apolloLoginUrl, { waitUntil: 'networkidle2' });

//     // Click on the "Continue with Google" button
//     // Update the selector if necessary; this is an example
//     await page.waitForSelector('#provider-mounter > div > div:nth-child(2) > div > div.zp_sAeGb > div > div.zp_Sg9Ha > div > div.zp_ajhD0.zp_hD_Gt > div > div > div:nth-child(1) > button > div'); // Adjust the selector if necessary
//     await page.click('#provider-mounter > div > div:nth-child(2) > div > div.zp_sAeGb > div > div.zp_Sg9Ha > div > div.zp_ajhD0.zp_hD_Gt > div > div > div:nth-child(1) > button > div');

//     // Wait for the Google login page to load
//     await page.waitForNavigation({ waitUntil: 'networkidle2' });

//     // Replace with your Gmail credentials
//     const gmailEmail = 'afaf68936@gmail.com';
//     const gmailPassword = '0324Pakistan!@#';

//     // Wait for the email input field, type in the Gmail address, and proceed
//     await page.waitForSelector('input[type="email"]');
//     await page.type('input[type="email"]', gmailEmail);
//     await page.keyboard.press('Enter');

//     console.log("test1");
//     // Wait for the password input field, type in the Gmail password, and proceed
//     await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 120000 });

//     console.log("test3");
//     try {
//         await page.waitForSelector('input[type="password"]', { timeout: 60000 });
//         await page.type('input[type="password"]', gmailPassword);
//         await page.keyboard.press('Enter');
//     } catch (error) {
//         console.error('Error typing password:', error);
//         await browser.close();
//         return;
//     }

//     // Wait for the Apollo dashboard to confirm successful login
//     await page.waitForNavigation({ waitUntil: 'networkidle2' });

//     // Verify if login was successful by checking for a specific element in the dashboard
//     if (await page.$('selector_for_dashboard_element')) {
//         console.log('Login successful');
//     } else {
//         console.log('Login failed');
//     }

//     // Close the browser after a few seconds (for demonstration purposes)
//     // await page.waitForTimeout(5000); // Adjust as needed for debugging
//     // await browser.close();
// }

// // Call the function
// loginToApolloWithGmail();


const puppeteer = require('puppeteer');
const fs = require('fs');
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

    // Set a higher default timeout
    await page.setDefaultNavigationTimeout(120000); // 2 minutes

    const apolloLoginUrl = 'https://app.apollo.io/#/login';
    await page.goto(apolloLoginUrl, { waitUntil: 'networkidle2' });
   // Replace with your Gmail credentials
   const gmailEmail = 'afaf68936@gmail.com';
   const gmailPassword = '0324Pakistan!@#';
    try {
      // Click on the "Continue with Google" button
    // Update the selector if necessary; this is an example
    await page.waitForSelector('#provider-mounter > div > div:nth-child(2) > div > div.zp_sAeGb > div > div.zp_Sg9Ha > div > div.zp_ajhD0.zp_hD_Gt > div > div > div:nth-child(1) > button > div'); // Adjust the selector if necessary
    await page.click('#provider-mounter > div > div:nth-child(2) > div > div.zp_sAeGb > div > div.zp_Sg9Ha > div > div.zp_ajhD0.zp_hD_Gt > div > div > div:nth-child(1) > button > div');

    } catch (error) {
        console.error('Error clicking on Google login button:', error);
        await browser.close();
        return;
    }

    // Enter the email address
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', gmailEmail); // Replace 'your_email@gmail.com' with your actual email
  await page.click('#identifierNext');

  // Wait for the password input to appear
  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', gmailPassword); // Replace 'your_password' with your actual password
  await page.click('#passwordNext');


    // Wait for navigation to the Apollo dashboard
    try {
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

        // Check for a specific element in the dashboard to confirm login success
        if (await page.$('#side-nav-people > div')) {
            console.log('Login successful');
            await page.click('#side-nav-people > div');

    const url = 'https://app.apollo.io/#/people?finderViewId=6716264b3692ba02d378ace5&personTitles[]=owner&personTitles[]=ceo&personTitles[]=founder&personLocations[]=Canada&personLocations[]=United%20States&qOrganizationKeywordTags[]=e-commerce&includedOrganizationKeywordFields[]=tags&includedOrganizationKeywordFields[]=name';
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('tbody', { visible: true });
    console.log('terere');
    // Scrape table data
    let obj = {};
    let flag = '';
    const tableData = await page.evaluate((obj) => {
        
        const rows = Array.from(document.querySelectorAll('table tr'));
        rows.push('a');

         rows.map((row,i) => {
            if(rows.length-1 == i){
                return obj;
            }
            const cells = Array.from(row.querySelectorAll('th, td'));

            
             cells.map((cell, index) => {
                // If this is the first cell (index 0) and it contains an <a> tag, get the href
                if (index === 0) {
                    const linkElement = cell.querySelector('a');
                    if (linkElement) {
                        if(cells[3].innerText.trim() == "Access email" && cells[4].innerText.trim() == "Access Mobile"){
                            obj[i]=linkElement.href
                            flag = i;
                            return '';
                        }
                    }
                }
    
                // Otherwise, return the text content of the cell
                 cell.innerText.trim();
            });
        });
        document.querySelector("#main-app > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > div > div.finder-results-list-panel-content > div > div > div > div > div > div > div > table > tbody:nth-child("+flag+")  > tr > td > div > div > label > div").click()
        document.querySelector("#main-app > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div > span:nth-child(7) > button").click()
                           
        return obj;
    }, obj);

     // Wait for the dialog with the role attribute to appear
     await page.waitForSelector('div[role="dialog"]');

     // Click the second button inside the dialog
     const buttons = await page.$$('div[role="dialog"] > div > div > div > button');
 
     // Check if there are buttons available and click the second one (index 1)
     if (buttons.length > 1) {
         await buttons[1].click();
         console.log('Clicked the second button inside the dialog.');
     } else {
         console.log('Button not found.');
     }


     // Wait for the dialog with the role attribute to appear
     await page.waitForSelector("body > div.apolloio-css-vars-reset.zp.zp-modal > div > div > div > div > button");

     // Click the second button inside the dialog
     await page.click("body > div.apolloio-css-vars-reset.zp.zp-modal > div > div > div > div > button");

     
    // console.log('obj',tableData[tableData.length-1]);

    // Object.keys(tableData[tableData.length-1]).map(async(k)=>{
    //     await page.goto(tableData[tableData.length-1][k], { waitUntil: 'networkidle2' });
    //     // Wait for specific text to appear on the page
    //     const textToWaitFor = 'Contact information';


    //     await page.waitForFunction(
    //         (text) => document.body.innerText.includes(text),
    //         {},
    //         textToWaitFor
    //     );

    //     // await page.waitForSelector('#m2iz9tns', { visible: true });
    //     // const bodyText = document.body.innerText;

    //     // Regular expression for matching phone numbers in various formats
    //     // const phoneRegex = /\+?1?[-.\s(]?(\d{3})[-.\s)]?\s?(\d{3})[-.\s]?(\d{4})/g;

    //     // // Find all matches and return as an array
    //     // const matches = [...bodyText.matchAll(phoneRegex)];

    //     // Format the matches into a more readable format, if needed
    //     console.log('k',tableData[tableData.length-1][k],Math.random())
    // })
    // Save the scraped data to a JSON file
    const filePath = 'tableData.json';
    fs.writeFile(filePath, JSON.stringify(tableData, null, 2), (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log(`Data saved to ${filePath}`);
        }
    });
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.error('Error waiting for dashboard navigation:', error);
    }
    await page.waitForTimeout(10000); // Adjust for debugging purposes
    await browser.close();
}

// Call the function
loginToApolloWithGmail();

