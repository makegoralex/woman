import fs from "fs";
import path from "path";

const domain = "people.evtenia.ru";
const port = process.env.APP_PORT || process.env.PORT || "3003";
const managedBlock = `
    # BEGIN EVTENIA CMS API
    client_max_body_size 250m;

    location ^~ /api/ {
        proxy_pass http://127.0.0.1:${port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location ^~ /cms/ {
        proxy_pass http://127.0.0.1:${port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location ^~ /uploads/ {
        proxy_pass http://127.0.0.1:${port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location = /admin/content {
        proxy_pass http://127.0.0.1:${port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location = /admin/upload {
        proxy_pass http://127.0.0.1:${port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    # END EVTENIA CMS API
`;

const searchDirs = ["/etc/nginx/sites-enabled", "/etc/nginx/conf.d"];
const obsoleteGeneratedLink = "/etc/nginx/sites-enabled/people.evtenia.ru.conf";

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(fullPath);
    if (entry.isFile() || entry.isSymbolicLink()) return [fullPath];
    return [];
  });
}

function fileContainsDomain(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8").includes(domain);
  } catch {
    return false;
  }
}

function findMatchingBrace(text, openIndex) {
  let depth = 0;
  for (let index = openIndex; index < text.length; index += 1) {
    if (text[index] === "{") depth += 1;
    if (text[index] === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function removeLocationBlock(text, pathPattern) {
  let output = text;
  const locationPattern = new RegExp(`\\n\\s*location\\s+(?:=\\s*)?(?:\\^~\\s*)?${pathPattern}\\s*\\{`, "g");

  while (true) {
    const match = locationPattern.exec(output);
    if (!match) return output;

    const openIndex = output.indexOf("{", match.index);
    const closeIndex = findMatchingBrace(output, openIndex);
    if (closeIndex === -1) return output;

    output = `${output.slice(0, match.index)}${output.slice(closeIndex + 1)}`;
    locationPattern.lastIndex = 0;
  }
}

function updateConfig(text) {
  let next = text.replace(/\n\s*# BEGIN EVTENIA CMS API[\s\S]*?# END EVTENIA CMS API\n?/g, "\n");
  next = removeLocationBlock(next, "\\/api\\/?");
  next = removeLocationBlock(next, "\\/cms\\/?");
  next = removeLocationBlock(next, "\\/uploads\\/?");
  next = removeLocationBlock(next, "\\/admin\\/content");
  next = removeLocationBlock(next, "\\/admin\\/upload");

  const serverNamePattern = new RegExp(`(server_name[^;]*${domain.replaceAll(".", "\\.")}[^;]*;\\s*)`, "g");
  if (!serverNamePattern.test(next)) return null;
  return next.replace(serverNamePattern, `$1${managedBlock}`);
}

try {
  const shouldRemoveGeneratedLink = fs.existsSync(obsoleteGeneratedLink)
    && fs.lstatSync(obsoleteGeneratedLink).isSymbolicLink()
    && fs.readFileSync(obsoleteGeneratedLink, "utf8").includes("upstream people_evtenia_node");

  if (shouldRemoveGeneratedLink) {
    fs.rmSync(obsoleteGeneratedLink);
    console.log(`Removed duplicate generated nginx site: ${obsoleteGeneratedLink}`);
  }
} catch (error) {
  console.warn(`Could not remove ${obsoleteGeneratedLink}: ${error.message}`);
}

const files = [...new Set(searchDirs.flatMap(walkFiles).filter(fileContainsDomain))];
if (files.length === 0) {
  throw new Error(`No active nginx config with ${domain} was found`);
}

let updatedFiles = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const updated = updateConfig(original);
  if (updated === null || updated === original) continue;

  const backup = `${file}.bak-${Date.now()}`;
  fs.copyFileSync(file, backup);
  fs.writeFileSync(file, updated);
  console.log(`Updated nginx CMS routes in ${file}; backup: ${backup}`);
  updatedFiles += 1;
}

if (updatedFiles === 0) {
  throw new Error(`Found nginx config for ${domain}, but no server_name block could be updated`);
}
