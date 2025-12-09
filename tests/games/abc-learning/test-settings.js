const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    page.on('console', msg => console.log(`[BROWSER]:`, msg.text()));
    page.on('pageerror', error => console.log(`[ERROR]:`, error.message));

    await page.goto('http://localhost:8080/games/abc-learning/index.html', { waitUntil: 'networkidle0' });

    console.log('1. Start screen loaded');
    await page.screenshot({ path: 'test-1-start.png' });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Click settings button (at center of screen, lower area)
    console.log('2. Clicking SETTINGS button...');
    await page.click('body', { clickCount: 1, offset: { x: 400, y: 380 } });

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('3. Settings screen loaded');
    await page.screenshot({ path: 'test-2-settings.png' });

    // Just take a screenshot of settings for now
    console.log('4. Taking screenshot of settings...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Click Start Game button (lower right area)
    console.log('5. Clicking START GAME...');
    await page.mouse.click(550, 520);

    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('6. Game started with selected letters');
    await page.screenshot({ path: 'test-4-game-with-progress.png' });

    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.screenshot({ path: 'test-5-letters-falling.png' });

    console.log('Test complete!');
    await browser.close();
})();
