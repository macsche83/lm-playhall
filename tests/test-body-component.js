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

    // Test if body() works with text()
    const testResult = await page.evaluate(() => {
        // Check what body() returns
        const testObj = add([
            text("TEST"),
            pos(400, 300),
            body()
        ]);

        return {
            hasBody: testObj.body !== undefined,
            bodyType: typeof testObj.body,
            components: Object.keys(testObj).filter(k => !k.startsWith('_'))
        };
    });

    console.log('\n=== BODY() COMPONENT TEST ===');
    console.log('hasBody:', testResult.hasBody);
    console.log('bodyType:', testResult.bodyType);
    console.log('components:', testResult.components);

    await browser.close();
})();
