
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import morgan from "morgan";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "..", "src");
const dataFile = path.join(__dirname, "scores.json");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(express.static(publicDir));

async function ensureData() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify({ scores: [] }, null, 2), "utf-8");
  }
}
await ensureData();

async function readScores() {
  const raw = await fs.readFile(dataFile, "utf-8");
  const json = JSON.parse(raw || "{\"scores\":[]}");
  if (!Array.isArray(json.scores)) json.scores = [];
  return json.scores;
}
async function writeScores(scores) {
  await fs.writeFile(dataFile, JSON.stringify({ scores }, null, 2), "utf-8");
}

app.get("/api/scores", async (_req, res) => {
  try {
    const scores = await readScores();
    const top10 = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    res.json(top10);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read scores" });
  }
});

app.post("/api/scores", async (req, res) => {
  try {
    const { name, score, character, dt } = req.body || {};
    if (typeof name !== "string" || typeof score !== "number") {
      return res.status(400).json({ error: "Invalid payload" });
    }
    const scores = await readScores();
    scores.push({
      name: name.trim().slice(0, 20) || "Anon",
      score,
      character: character || "cat",
      dt: dt || new Date().toISOString(),
    });
    await writeScores(scores);
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Star Runner Lite server on http://localhost:${PORT}`);
});
