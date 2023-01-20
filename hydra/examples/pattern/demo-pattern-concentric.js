// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

cx = () => 0.5 + 0.5 * Math.cos(0.231 * time);
cy = () => 0.5 + 0.5 * Math.sin(0.371 * time);
concentric(100).out(o0)
concentric(100, cx, cy).out(o1)
concentric(13, cy, cx).mult(concentric(11, cx, cy)).out(o2)
concentric(-10, 0.5, cy).color(1, cx, cy).out(o3)
render()
