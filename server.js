const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Keep the process alive — log errors but don't crash on individual request failures
process.on("uncaughtException", (err) => {
  console.error("[uncaughtException]", new Date().toISOString(), err.message);
});
process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection]", new Date().toISOString(), reason);
});

// Trigger GC every 60s to prevent memory accumulation on shared hosting
if (global.gc) {
  setInterval(() => { try { global.gc(); } catch {} }, 60000);
}

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log("Atelier Nuvelle running on port " + PORT);
  });
});
