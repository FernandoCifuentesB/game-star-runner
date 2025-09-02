import { CONFIG } from "../config.js";

export function defineMenuScene(k, game) {
  k.scene("menu", () => {
    k.setGravity(CONFIG.gravity);

    k.add([
      k.text("STAR RUNNER LITE", { size: 36 }),
      k.pos(k.center().x, 80),
      k.anchor("center"),
    ]);

    const options = [
      {
        label: "Iniciar juego",
        action: () => k.go("game", { character: game.currentCharacter }),
      },
      { label: "Cambiar personaje", action: () => k.go("character") },
      { label: "Ver mejores puntuaciones", action: () => k.go("highscores") },
    ];

    let idx = 0;

    const items = options.map((opt, i) => {
      const y = 160 + i * 40;
      return k.add([
        k.text(opt.label, { size: 24 }),
        k.pos(k.center().x, y),
        k.anchor("center"),
        "menu-item",
        { i },
      ]);
    });

    function renderCursor() {
      items.forEach((it, i) => {
        it.color = i === idx ? k.rgb(255, 255, 255) : k.rgb(180, 180, 200);
        it.scale = i === idx ? k.vec2(1.08) : k.vec2(1);
      });
    }
    renderCursor();

    k.onKeyPress("up", () => {
      idx = (idx - 1 + options.length) % options.length;
      renderCursor();
    });
    k.onKeyPress("down", () => {
      idx = (idx + 1) % options.length;
      renderCursor();
    });
    k.onKeyPress("enter", () => options[idx].action());

    k.onKeyPress("escape", () => {});
  });
}
