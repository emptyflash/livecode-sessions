// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/a = () => 0.537 * time;
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

a = () => 0.137 * time;
spiral(2.0, 5.0, 0.3).rotate(() => -2.0 * a()).out(o0)
spiral(2.0, 5.0, 0.3).rotate(a).diff(concentric(100.0,0.25,0.25)).out(o1)
spiral(2.0, 5.0, 0.3).rotate(a).mult(spiral(1.0, 3.0, 0.3)).out(o2)
spiral(1.0, 5.0, 0.1).rotate(a).diff(brick()).out(o3)
render()
