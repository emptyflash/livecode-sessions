// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")

noise(15, 0.1).rotate(() => 0.2*time).out(o0)
unoise(15, 0.1).rotate(() => 0.2*time).out(o1)
turb(15, 0.1, 3).rotate(() => 0.2*time).out(o2)
uturb(15, 0.1, 3).rotate(() => 0.2*time).out(o3)
render()
