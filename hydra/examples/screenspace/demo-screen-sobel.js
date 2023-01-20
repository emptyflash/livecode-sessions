// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

s0.initCam();
src(s0).sobelx().out(o1);
src(s0).sobely().out(o2);
src(o1).add(o2).out(o3);
render(o3)
