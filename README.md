
# Star Runner Lite

Mini videojuego 2D tipo plataforma (estilo Mario) hecho con **Kaboom.js** (frontend) y **Node.js + Express** (backend) para guardar puntajes. Incluye aplicación de **Facade**, **Adapter**, **IoC/DI**, y principios **SOLID**.


## 🎯 Características
- Menú principal: *Iniciar juego*, *Cambiar de personaje* (gato 🐱, perro 🐶, capy 🦫), *Ver mejores puntuaciones*.
- Jugabilidad: moverse ←/→, saltar (␣), recoger monedas, evitar obstáculos.
- Puntaje se guarda en `server/scores.json` vía API REST.
- Top 10 de puntajes.
- Estructura con patrones de diseño y IoC.
- Sin bundler: Kaboom se carga por CDN para simplificar.

## ▶️ Ejecutar
1. Requisitos: Node 18+
2. Instalar:
   ```bash
   npm install
   ```
3. Desarrollar:
   ```bash
   npm run dev
   # abre http://localhost:3000
   ```
4. Producción (igual que dev en este ejemplo):
   ```bash
   npm start
   ```

## 🧩 Patrones aplicados
- **Facade**: `src/facade/GameFacade.js` centraliza `start()`, `restart()`, `saveScore()`, navegación de escenas y personaje.
- **Adapter**:
  - `src/input/IInputAdapter.js`
  - `src/input/KeyboardInputAdapter.js` (teclado)
  - `src/input/SimulatedInputAdapter.js` (simulado)
- **IoC / DI**: `src/di/container.js` registra/inyecta `IScoreService`, `IInputAdapter`.
- **DIP (SOLID)**: `GameFacade` depende de interfaces (`IScoreService`, `IInputAdapter`), no de implementaciones concretas.

## 📁 Estructura
```
star-runner-lite/
├─ src/
│  ├─ config.js
│  ├─ main.js
│  ├─ di/container.js
│  ├─ facade/GameFacade.js
│  ├─ input/
│  │  ├─ IInputAdapter.js
│  │  ├─ KeyboardInputAdapter.js
│  │  └─ SimulatedInputAdapter.js
│  ├─ services/
│  │  ├─ IScoreService.js
│  │  └─ HttpScoreService.js
│  └─ scenes/
│     ├─ menu.js
│     ├─ characterSelect.js
│     ├─ highscores.js
│     └─ game.js
├─ server/
│  ├─ server.js
│  └─ scores.json
├─ docs/uml.puml
└─ package.json
```

## 🕹 Controles
- **← →** moverse
- **Espacio / ↑** saltar
- **Esc** menú
- **Enter** confirmar

## 🛠 Mejoras sugeridas
- Sprites reales y tileset.
- Sonido para monedas / saltos.
- Persistir personaje seleccionado en localStorage.
- Validaciones y UI de nombre de jugador en overlay en vez de `prompt()`.
- Pruebas unitarias para `GameFacade` con adaptador de entrada simulado.

## 🔀 GitFlow (sugerencia rápida)
```bash
git init
git add . && git commit -m "chore: scaffold inicial"
git branch -M main
git checkout -b develop

# features (cada integrante una)
git checkout -b feature/gameplay
git commit -m "feat: escena de juego básica"

git checkout develop
git merge --no-ff feature/gameplay -m "merge: gameplay"

# crear otro feature y provocar/resolver conflicto en README.md, documentar
git tag v1.0.0
```

## 📜 Licencia
-Cifuentes Bohorquez David Fernando 
-Corzo Salazar Alec Fabian
-Pulido Arias Ibeth Stefanny
-Vergara Sanchez Hugo Andres 

