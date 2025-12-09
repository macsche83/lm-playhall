const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    page.on('console', async msg => {
        console.log(`[BROWSER]:`, msg.text());
    });

    page.on('pageerror', error => {
        console.log(`[ERROR]: ${error.message}`);
    });

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

    console.log('Clicking to start...');
    await page.click('body');

    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check all game objects
    const objects = await page.evaluate(() => {
        const allObjs = get('*');
        return allObjs.map(obj => ({
            tag: obj.is('letter') ? 'LETTER' : obj.is('ground') ? 'GROUND' : obj.is('target-display') ? 'TARGET' : obj.is('score-display') ? 'SCORE' : 'OTHER',
            pos: obj.pos ? { x: obj.pos.x, y: obj.pos.y } : 'no-pos',
            text: obj.text || 'no-text',
            hasBody: obj.body !== undefined
        }));
    });

    console.log('\n=== ALL GAME OBJECTS ===');
    objects.forEach((obj, i) => {
        console.log(`${i}: ${obj.tag} at ${JSON.stringify(obj.pos)} - text: "${obj.text}" - hasBody: ${obj.hasBody}`);
    });

    await browser.close();
})();
