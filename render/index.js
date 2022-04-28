const puppeteer = require("puppeteer");


(async function() {
  const args = process.argv.slice(2)
  const path = args[0]
  console.log("Launcing puppeteer");
  const browser = await puppeteer.launch(); //{headless: false, executablePath: '/usr/bin/google-chrome'}
  const page = await browser.newPage();
  console.log("Opening sketch");
  await page.goto("http://localhost:8000/index.html");
  await page.evaluate("sandbox.pause();");
  await page.setViewport({
    width: 1080,
    height: 1920,
  });
  console.log("Begin recording");
  const fps = 60;
  const frames = fps * 15;
  await page.evaluate(`performance.now = () => sandbox.timePrev + (1/${fps} * 1000);`);
  for (let i = 1; i <= frames; i++) {
      console.log(`rendering frame ${i} of ${frames}.`);
      await page.evaluate("sandbox.forceRender = true;");
      await page.screenshot({
        omitBackground: true,
        path: `${path}/frame${i}.png`
      });
  }
  process.exit(0);
})()
