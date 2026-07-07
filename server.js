import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = Number(process.env.PORT) || 3003;
const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Evtenia2026!";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));
app.get("/admin", requireAdminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
