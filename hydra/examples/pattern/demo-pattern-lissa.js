// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

a = () => 1 + 0.5 * (1 + Math.sin(0.137 * time));
b = () => (1 + Math.sin(0.037 * time));
t = () => 0.137 * time;
lissa(t, 3).out(o0)
lissa(a, 2, 1, 0.3).out(o1)
lissa(() => t() * 0.1, b).out(o2)
lissa(a, 3, 1).invert().modulateScrollY(lisa(b, 2, 2, 0.4)).out(o3)
render()
