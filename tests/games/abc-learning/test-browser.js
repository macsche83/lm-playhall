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

    // Listen to request failures
    page.on('requestfailed', request => {
        console.log(`[REQUEST FAILED]: ${request.url()}`);
        console.log(`  Failure: ${request.failure().errorText}`);
    });

    console.log('Navigating to http://localhost:8080/games/abc-learning/index.html...');
    await page.goto('http://localhost:8080/games/abc-learning/index.html', {
        waitUntil: 'networkidle0',
        timeout: 10000
    });

    console.log('Page loaded. Waiting 3 seconds to observe...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'game-screenshot.png' });

    console.log('Test complete. Closing browser...');
    await browser.close();
})();
