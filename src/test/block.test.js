// // test.js
const timeout = 5000;

const delay = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:3000');
    }, timeout);

    it('should load without error', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('JavaScript');
    });

    it('should load a disabled button', async () => {
      const firstButtonClass = await page.$eval(
        '.flow-chart button',
        el => el.className
      );
      expect(firstButtonClass).toEqual('MuiButtonBase-root box crude-extract');
    });

    it('should click the first $(button.plant-material) to enable it', async () => {
      const click = await page.click('.flow-chart button.plant-material');
      const className = await page.$eval(
        '.flow-chart button.plant-material',
        el => el.className
      );
      expect(className).toEqual(
        'MuiButtonBase-root box plant-material active enabled'
      );
    });
  },
  timeout
);
