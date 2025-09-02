export function defineHighScoresScene(k, game) {
  k.scene("highscores", async () => {
    k.add([
      k.text("Top 10 Puntajes", { size: 28 }),
      k.pos(k.center().x, 60),
      k.anchor("center"),
    ]);

    const loading = k.add([
      k.text("Cargando..."),
      k.pos(k.center().x, 120),
      k.anchor("center"),
    ]);
    try {
      const list = await game.scoreService.getTop10();
      loading.destroy();
      list.forEach((it, i) => {
        const y = 120 + (i + 1) * 28;
        const row = `#${String(i + 1).padStart(2, " ")}  ${it.name.padEnd(
          10,
          " "
        )}  ${it.score.toString().padStart(5, " ")}  (${it.character})`;
        k.add([
          k.text(row, { size: 18 }),
          k.pos(k.center().x, y),
          k.anchor("center"),
        ]);
      });
      if (list.length === 0) {
        k.add([
          k.text("No hay puntajes aún."),
          k.pos(k.center().x, 160),
          k.anchor("center"),
        ]);
      }
    } catch (err) {
      loading.text = "Error cargando puntajes";
    }

    k.onKeyPress("escape", () => k.go("menu"));
    k.onKeyPress("enter", () => k.go("menu"));
  });
}
