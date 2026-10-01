import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(appRoot, "dist");
const staticDir = path.join(distDir, "site-refresh");
const adminEntry = path.join(distDir, "admin", "index.html");
const mainEntry = path.join(distDir, "index.html");

if (!fs.existsSync(mainEntry) || !fs.existsSync(staticDir)) {
  throw new Error("Vite output or the static site files are missing");
}

fs.mkdirSync(path.dirname(adminEntry), { recursive: true });
fs.copyFileSync(mainEntry, adminEntry);

for (const entry of fs.readdirSync(staticDir, { withFileTypes: true })) {
  const source = path.join(staticDir, entry.name);
  const destination = path.join(distDir, entry.name);

  if (entry.isDirectory()) {
    fs.cpSync(source, destination, { recursive: true, force: true });
  } else if (entry.isFile()) {
    fs.copyFileSync(source, destination);
  }
}

fs.rmSync(staticDir, { recursive: true, force: true });
console.log("Prepared the EVTENIA pages at the site root and kept the CMS entry at /admin/");
