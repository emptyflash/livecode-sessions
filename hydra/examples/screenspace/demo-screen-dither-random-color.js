// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

s0.initCam();
src(s0).out(o0)
src(s0).contrast(1.5).ditherrnd().out(o1);
src(s0).contrast(1.1).scale(0.5).ditherrnd().color(1.0, 0.5, 0.0).out(o2);
osc(10).ditherrnd().out(o3);
render()
