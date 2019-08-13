const timeout = 5000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:3000');
    }, timeout);

    afterAll(async () => {
      await setTimeout(() => {
        page.close();
      }, 3000);
    });

    it('should load an enabled button', async () => {
      const firstButtonClass = await page.$eval(
        '.tech-tree button:first-child',
        el => el.className
      );
      expect(firstButtonClass).toEqual('MuiButtonBase-root item  enabled');
    });

    it('should click a button', async () => {
      await page.click('.tech-tree button:first-child');
      const className = await page.$eval(
        '.tech-tree button:first-child',
        el => el.className
      );
      expect(className).toEqual('MuiButtonBase-root item  active enabled');
    });
  },
  timeout
);
