// jest-puppeteer.config.js
module.exports = {
  // launch: {
  //   dumpio: true,
  //   headless: process.env.HEADLESS !== 'false'
  // },
  browserContext: 'default',
  server: {
    command: `npm start`,
    port: 3000,
    launchTimeout: 10000,
    debug: true
  }
};
