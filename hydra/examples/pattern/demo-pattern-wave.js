// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

a = () => 8.0 * (1 + Math.sin(0.37 * time));
t = () => 0.037 * time;
wave(t, 10, 2).out(o0)
wave(t, 3, a).out(o1)
wave(t).mult(noise().color(0.5, 0.5, 2)).out(o2)
wave(t, 3, a).add(wave(() => t() * -1, 1)).out(o3)
render()
