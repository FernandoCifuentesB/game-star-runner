
import { IScoreService } from "./IScoreService.js";
import { CONFIG } from "../config.js";

export class HttpScoreService extends IScoreService {
  constructor(base = CONFIG.apiBase) { super(); this.base = base; }
  async getTop10() {
    const res = await fetch(`${this.base}/scores`);
    if (!res.ok) throw new Error("No se pudieron cargar puntajes");
    return await res.json();
  }
  async saveScore(name, score, character) {
    const res = await fetch(`${this.base}/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score, character, dt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error("No se pudo guardar el puntaje");
    return true;
  }
}
