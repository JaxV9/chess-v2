const fs = require("fs");
const path = require("path");

const targetPath = path.join(__dirname, "../src/environments/environment.ts");

const rawWsUrl = process.env.WS_BASE_URL || "ws://127.0.0.1:8000";
const rawHttpUrl = process.env.HTTP_BASE_URL || "http://localhost:8000";

const wsBaseUrl = rawWsUrl.replace(/\/+$/, "");
const httpBaseUrl = rawHttpUrl.replace(/\/+$/, "");

const envConfigFile = `export const environment = {
    production: true,
    wsBaseUrl: '${wsBaseUrl}',
    httpBaseUrl: '${httpBaseUrl}'
};
`;

fs.mkdirSync(path.dirname(targetPath), { recursive: true });

fs.writeFileSync(targetPath, envConfigFile, "utf8");
