// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

a = () => 7 + 5 * Math.sin(0.1 * time);
checker(a).out(o0)
checker(a).modulate(noise()).out(o1)
checker(a).modulateRotate(checker(50)).out(o2)
checker(a).modulate(concentric(10.0,0.75,0.25)).out(o3)
render()
