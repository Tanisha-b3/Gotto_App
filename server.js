import express from "express";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set view engine BEFORE routes
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// get short git hash
let commitHash = "dev";
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch {
  console.warn("⚠️ Could not fetch git hash, using 'dev'");
}

// static files
app.use(express.static(path.join(__dirname, "public")));

// home route
app.get("/", (req, res) => {
  res.render("index.ejs", { commitHash }); // ✅ specify extension
});

// health check
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ App running on http://localhost:${PORT}`));
