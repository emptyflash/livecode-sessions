// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

a = () => 0.001 * time;
b = () => 0.1 + 0.1 * (1 + Math.sin(0.05 * time));
brick(0.2, 0.08, 0.005).out(o0);
brick(0.01, 0.2, 0.003).scrollX(a).out(o1);
brick(0.2, 0.08, 0.005).invert(() => 0.5 + 0.5 * Math.sin(0.1 * time)).out(o2);
brick(b, b, 0.005).out(o3);
render()
