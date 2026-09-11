const fs = require("fs");
const path = require("path");

const targetPath = path.join(__dirname, "../src/environments/environment.ts");

const envConfigFile = `export const environment = {
    production: true,
    wsBaseUrl: '${process.env.WS_BASE_URL || "ws://127.0.0.1:8000"}',
    httpBaseUrl: '${process.env.HTTP_BASE_URL || "http://localhost:8000"}'
};
`;

fs.mkdirSync(path.dirname(targetPath), { recursive: true });

fs.writeFileSync(targetPath, envConfigFile, "utf8");
