// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")

cwarp(3, 0.1, 1, 1, 3.0, () => Math.sin(0.02*time)).rotate(() => -0.01 * time).out(o0);
