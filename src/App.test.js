import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const puppeteer = require('puppeteer');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Calculator', () => {
  it('should be titled "Cruz Science Process Calculator"', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    await expect(page.title()).resolves.toMatch(
      'Cruz Science Process Calculator'
    );

    setTimeout(() => {
      browser.close();
    }, 3000);
  }, 5000);
});
//
// describe('H1 Text', () => {
//   test('h1 loads correctly', async () => {
//     let browser = await puppeteer.launch({
//       headless: false
//     });
//     let page = await browser.newPage();
//
//     page.emulate({
//       viewport: {
//         width: 500,
//         height: 2400
//       },
//       userAgent: ''
//     });
//
//     await page.goto('http://localhost:3000/');
//     await page.waitForSelector('.tech-tree');
//
//     const html = await page.$eval('.tech-tree button', e => {
//       console.log(e);
//       return e.innerHTML;
//     });
//     expect(html).toBe('Welcome to React');
//
//     browser.close();
//   }, 16000);
// });

// describe('Calculator', () => {
//   beforeAll(async () => {
//     await page.goto('http://localhost:3000');
//   });
//
//   // it('should have a reset button', async () => {
//   //   await expect();
//   // });
//   // it('should have setupData.js file');
//   // it('should have a child in setupData.js with 3 ancestors');
//   // it('should have a potency slider');
//   // it('should have a potency text input');
//   // it('should have the potency input and slider syncronized');
//
//   it('should be titled "Cruz Science Process Calculator"', async () => {
//     await expect(page.title()).resolves.toMatch(
//       'Cruz Science Process Calculator'
//     );
//   });
// });
