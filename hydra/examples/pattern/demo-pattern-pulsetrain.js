// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

// triangle wave
tw = () => (0.067 * time) % 2.0;
pulsetrain(10, tw, 0.01).out(o0)
pulsetrain(10, tw, 0.01).rotate(1.57).out(o1)
pulsetrain(10, tw, 0.01).kaleid().out(o2)
pulsetrain(10, tw, 0.01).modulate(noise()).out(o3)
render()
