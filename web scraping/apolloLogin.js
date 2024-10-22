



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
             // Save cookies
            const cookies = await page.cookies();
            fs.writeFileSync(path.join(__dirname, 'cookies.json'), JSON.stringify(cookies, null, 2));

            // Save local storage data
            const localStorageData = await page.evaluate(() => {
                return JSON.stringify(localStorage);
            });
            fs.writeFileSync(path.join(__dirname, 'localStorage.json'), localStorageData);

        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.error('Error waiting for dashboard navigation:', error);
    }
    // await page.waitForTimeout(1000); // Adjust for debugging purposes
    // await browser.close();
}

// Call the function
loginToApolloWithGmail();

