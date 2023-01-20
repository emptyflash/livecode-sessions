// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

s0.initCam();
src(s0).contrast(1.1).color(1.0, 0.5, 0.0).scale(0.5).dither4().out(o0);
render(o0)
