import { CONFIG } from "../config.js";

export function defineGameScene(k, game) {
  k.scene("game", (opts = {}) => {
    const charKey = opts.character || game.currentCharacter || "cat";
    const charInfo = CONFIG.player.characters[charKey];

    k.setGravity(CONFIG.gravity);

    k.add([k.rect(k.width(), k.height()), k.color(13, 15, 26), k.pos(0, 0)]);

    k.add([
      k.rect(k.width(), 32),
      k.pos(0, k.height() - 32),
      k.area(),
      k.body({ isStatic: true }),
      k.color(40, 44, 52),
    ]);

    const player = k.add([
      k.sprite(charKey, { width: 50, height: 50 }), 
      k.pos(60, k.height() - 80),
      k.area(),
      k.body(),
      {
        speed: charInfo.speed,
        jumpPower: charInfo.jump,
        score: 0,
        alive: true,
      },
    ]);

    const scoreLabel = k.add([
      k.text("Puntaje: 0", { size: 18 }),
      k.pos(12, 8),
    ]);

    let difficulty = 1;

    k.loop(3, () => {
      difficulty += 0.2; 
    });

    function addObstacle() {
      const h = k.rand(20, 60);
      const w = k.rand(20, 40);
      const y = k.height() - 32 - h;
      const o = k.add([
        k.rect(w, h),
        k.pos(k.width(), y),
        k.area(),
        "obstacle",
        { speed: k.rand(140, 220) * difficulty },
        k.color(255, 99, 110),
      ]);
      o.onUpdate(() => {
        o.move(-o.speed, 0);
        if (o.pos.x < -80) o.destroy();
      });
    }

    function addCoin() {
      const y = k.height() - 100 - k.rand(0, 60);
      const c = k.add([
        k.circle(8),
        k.pos(k.width(), y),
        k.area(),
        "coin",
        { speed: 180 * difficulty },
        k.color(255, 226, 89),
        k.outline(2, k.rgb(140, 100, 30)),
      ]);
      c.onUpdate(() => {
        c.move(-c.speed, 0);
        if (c.pos.x < -40) c.destroy();
      });
    }

    const obstacleTimer = k.loop(CONFIG.spawn.obstacleEvery, addObstacle);
    const coinTimer = k.loop(CONFIG.spawn.coinEvery, addCoin);

    const detach = game.inputAdapter.attach(k, {
      left() {
        if (player.alive) player.move(-player.speed, 0);
      },
      right() {
        if (player.alive) player.move(player.speed, 0);
      },
      stop() {},
      jump() {
        if (player.alive && player.isGrounded()) player.jump(player.jumpPower);
      },
      pause() {
        k.go("menu");
      },
    });
    k.onSceneLeave(() => {
      if (detach) detach();
    });

    player.onCollide("coin", (c) => {
      c.destroy();
      player.score += CONFIG.coinValue;
      scoreLabel.text = `Puntaje: ${player.score}`;
    });

    player.onCollide("obstacle", async () => {
      if (!player.alive) return;
      player.alive = false;
      obstacleTimer.cancel();
      coinTimer.cancel();

      try {
        const name =
          window.prompt("¡Game Over! Ingresa tu nombre:", "Anon") || "Anon";
        await game.saveScore(name, player.score);
      } catch (e) {
        console.warn("No se pudo guardar el puntaje:", e);
      }
      k.go("gameover", { score: player.score, character: charKey });
    });
  });

  k.scene("gameover", ({ score, character }) => {
    k.add([
      k.text("GAME OVER", { size: 36 }),
      k.pos(k.center().x, 80),
      k.anchor("center"),
    ]);
    k.add([
      k.text(`Puntaje: ${score}`, { size: 24 }),
      k.pos(k.center().x, 130),
      k.anchor("center"),
    ]);
    k.add([
      k.text(`Personaje: ${character}`),
      k.pos(k.center().x, 160),
      k.anchor("center"),
    ]);

    const options = [
      { label: "Reintentar", action: () => k.go("game", { character }) },
      { label: "Menú principal", action: () => k.go("menu") },
    ];
    let idx = 0;
    const items = options.map((opt, i) => {
      const y = 200 + i * 36;
      return k.add([
        k.text(opt.label, { size: 22 }),
        k.pos(k.center().x, y),
        k.anchor("center"),
      ]);
    });

    function render() {
      items.forEach((it, i) => {
        it.color = i === idx ? k.rgb(255, 255, 255) : k.rgb(180, 180, 200);
        it.scale = i === idx ? k.vec2(1.06) : k.vec2(1);
      });
    }
    render();

    k.onKeyPress("up", () => {
      idx = (idx - 1 + options.length) % options.length;
      render();
    });
    k.onKeyPress("down", () => {
      idx = (idx + 1) % options.length;
      render();
    });
    k.onKeyPress("enter", () => options[idx].action());
    k.onKeyPress("escape", () => k.go("menu"));
  });
}