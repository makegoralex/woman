import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import crypto from "crypto";

const app = express();
const PORT = Number(process.env.PORT) || 3003;
const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Evtenia2026!";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const UPLOAD_DIR = path.join(__dirname, "public", "uploads");

app.use(express.json({ limit: "250mb" }));

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function readContent() {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function writeContent(content) {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    const error = new Error("Content payload must be a JSON object");
    error.statusCode = 400;
    throw error;
  }

  await ensureStorage();
  const tmpFile = `${CONTENT_FILE}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(content, null, 2));
  await fs.rename(tmpFile, CONTENT_FILE);
}

function isAdminAuthorized(req) {
  const header = req.headers.authorization || "";
  const [type, credentials] = header.split(" ");
  if (type !== "Basic" || !credentials) return false;

  const [login, password] = Buffer.from(credentials, "base64").toString("utf8").split(":");
  return login === ADMIN_LOGIN && password === ADMIN_PASSWORD;
}

function requireAdminAuth(req, res, next) {
  if (isAdminAuthorized(req)) return next();
  res.setHeader("WWW-Authenticate", 'Basic realm="EVTENIA CMS"');
  return res.status(401).send("Authentication required");
}

async function getContentRequest(req, res, next) {
  try {
    res.json(await readContent() || {});
  } catch (error) {
    next(error);
  }
}

app.get("/admin/content", requireAdminAuth, getContentRequest);
app.get("/cms/content", getContentRequest);
app.get("/api/content", getContentRequest);

async function saveContentRequest(req, res, next) {
  try {
    await writeContent(req.body || {});
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}

app.post("/admin/content", requireAdminAuth, saveContentRequest);
app.put("/admin/content", requireAdminAuth, saveContentRequest);
app.post("/cms/content", saveContentRequest);
app.put("/cms/content", saveContentRequest);
app.post("/api/content", saveContentRequest);
app.put("/api/content", saveContentRequest);

async function uploadRequest(req, res, next) {
  try {
    await ensureStorage();
    const files = Array.isArray(req.body?.files) ? req.body.files : [];
    const urls = [];

    for (const dataUrl of files) {
      const match = String(dataUrl).match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (!match) continue;
      const [, mimeType, payload] = match;
      const ext = mimeType.includes("webp") ? "webp" : mimeType.includes("png") ? "png" : "jpg";
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
      await fs.writeFile(path.join(UPLOAD_DIR, fileName), Buffer.from(payload, "base64"));
      urls.push(`/uploads/${fileName}`);
    }

    res.json({ urls });
  } catch (error) {
    next(error);
  }
}

app.post("/admin/upload", requireAdminAuth, uploadRequest);
app.post("/cms/upload", uploadRequest);
app.post("/api/upload", uploadRequest);

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));
app.get("/admin", requireAdminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  if (error.type === "entity.too.large") {
    return res.status(413).json({ error: "Upload is too large" });
  }
  res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
});

ensureStorage().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
});
