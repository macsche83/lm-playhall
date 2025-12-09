const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    page.on('console', msg => console.log(`[BROWSER]:`, msg.text()));
    page.on('pageerror', error => console.log(`[ERROR]:`, error.message));

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

    console.log('1. Start screen');
    await page.screenshot({ path: 'pause-1-start.png' });
    await new Promise(resolve => setTimeout(resolve, 500));

    // Click PLAY
    console.log('2. Clicking PLAY...');
    await page.mouse.click(400, 320);
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('3. Game running');
    await page.screenshot({ path: 'pause-2-game-running.png' });

    // Click MENU button (top right)
    console.log('4. Clicking MENU button...');
    await page.mouse.click(750, 20);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('5. Pause menu displayed');
    await page.screenshot({ path: 'pause-3-pause-menu.png' });

    // Click RESUME
    console.log('6. Clicking RESUME...');
    await page.mouse.click(400, 270);
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('7. Game resumed');
    await page.screenshot({ path: 'pause-4-game-resumed.png' });

    // Pause again
    console.log('8. Pausing again...');
    await page.mouse.click(750, 20);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({ path: 'pause-5-paused-again.png' });

    // Click MAIN MENU
    console.log('9. Clicking MAIN MENU...');
    await page.mouse.click(400, 410);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('10. Back to start screen');
    await page.screenshot({ path: 'pause-6-back-to-start.png' });

    console.log('Test complete!');
    await browser.close();
})();
