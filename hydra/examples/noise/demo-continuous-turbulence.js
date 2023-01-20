// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")

turb(3, 0,  () => 6 * ((0.5 * time) % 1.0)).out(o0);
uturb(3, 0, () => 6 * ((0.5 * time) % 1.0)).out(o1);
warp(3, 0,  () => 6 * ((0.5 * time) % 1.0), () => 6 * ((0.5 * time) % 1.0)).out(o2);
cwarp(3, 0, () => 6 * ((0.5 * time) % 1.0), () => 6 * ((0.5 * time) % 1.0)).out(o3);
render()
