export const CONFIG = {
  gravity: 1600,
  player: {
    baseSpeed: 260,
    jumpForce: 600,
    characters: {
      cat: { speed: 280, jump: 620 },
      dog: { speed: 260, jump: 650 },
      capy: { speed: 230, jump: 580 },
    },
  },
  coinValue: 10,
  spawn: {
    obstacleEvery: 1.8,
    coinEvery: 1.0,
  },
  apiBase: "/api",
};
