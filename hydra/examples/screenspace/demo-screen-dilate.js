// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/all.js")

noise().scale(1, 1, 0.01).color(1.0, 0.8, 0.2).out(o0)
src(o0).dilate().out(o1)
render(o1)
