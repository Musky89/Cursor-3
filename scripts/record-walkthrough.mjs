import { mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.WALKTHROUGH_BASE_URL ?? "http://localhost:3000";
const OUTPUT_DIR = path.join(process.cwd(), "artifacts", "video");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "oud-atlas-walkthrough.webm");

const routes = [
  "/",
  "/directory",
  "/directory?q=oud",
  "/forum",
  "/brands",
  "/fragrance/tom-ford-oud-wood",
];

async function pause(page, ms = 1200) {
  await page.waitForTimeout(ms);
}

async function smoothScroll(page) {
  await page.mouse.wheel(0, 700);
  await pause(page, 900);
  await page.mouse.wheel(0, 700);
  await pause(page, 700);
  await page.mouse.wheel(0, -500);
  await pause(page, 500);
}

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
    await pause(page, 1300);
    await smoothScroll(page);
  }

  const recorded = page.video();
  await context.close();
  await browser.close();

  if (!recorded) {
    throw new Error("Video capture failed: no video object found.");
  }

  const tempPath = await recorded.path();
  await rename(tempPath, OUTPUT_FILE);
  console.log(`Walkthrough saved: ${OUTPUT_FILE}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
