const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Listen to console messages
    page.on('console', msg => {
        const type = msg.type();
        const text = msg.text();
        console.log(`[BROWSER ${type.toUpperCase()}]: ${text}`);
    });

    // Listen to page errors
    page.on('pageerror', error => {
        console.log(`[PAGE ERROR]: ${error.message}`);
        console.log(error.stack);
    });

    console.log('Navigating to http://localhost:8080...');
    await page.goto('http://localhost:8080', {
        waitUntil: 'networkidle0',
        timeout: 10000
    });

    console.log('Page loaded. Taking screenshot of start screen...');
    await page.screenshot({ path: 'screenshot-1-start.png' });

    console.log('Clicking to start game...');
    await page.click('body');

    console.log('Waiting 2 seconds for game to initialize...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.screenshot({ path: 'screenshot-2-game-started.png' });

    console.log('Waiting 5 more seconds for letters to fall...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    await page.screenshot({ path: 'screenshot-3-letters-falling.png' });

    console.log('Test complete. Closing browser...');
    await browser.close();
})();
