const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Listen to ALL console messages
    page.on('console', async msg => {
        const type = msg.type();
        const text = msg.text();
        const args = await Promise.all(msg.args().map(arg => arg.jsonValue().catch(() => arg.toString())));
        console.log(`[BROWSER ${type.toUpperCase()}]:`, text, args.length > 0 ? args : '');
    });

    // Listen to page errors
    page.on('pageerror', error => {
        console.log(`[PAGE ERROR]: ${error.message}`);
        console.log(error.stack);
    });

    // Listen to exceptions
    page.on('error', error => {
        console.log(`[ERROR]: ${error.message}`);
    });

    console.log('Navigating to http://localhost:8080...');
    await page.goto('http://localhost:8080', {
        waitUntil: 'networkidle0',
        timeout: 10000
    });

    // Inject debug code
    await page.evaluate(() => {
        console.log('=== INJECTING DEBUG CODE ===');
        window.originalAdd = window.add;
        window.addCallCount = 0;
        window.add = function(...args) {
            window.addCallCount++;
            console.log('add() called, total calls:', window.addCallCount);
            return window.originalAdd(...args);
        };
    });

    console.log('Clicking to start game...');
    await page.click('body');

    console.log('Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check game state
    const gameState = await page.evaluate(() => {
        return {
            addCallCount: window.addCallCount,
            width: width ? width() : 'N/A',
            height: height ? height() : 'N/A',
            allObjects: get ? get('*').length : 'N/A'
        };
    });

    console.log('Game state:', gameState);

    await page.screenshot({ path: 'debug-screenshot.png' });

    console.log('Closing browser...');
    await browser.close();
})();
