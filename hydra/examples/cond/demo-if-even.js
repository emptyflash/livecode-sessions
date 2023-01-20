// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-cond.js")

noise().repeat() // default branch
	.ifeven(osc(5, .2).repeat().kaleid(), // alternate branch, only when condidition is met
         () => time) // value for the condition "if even" to be tested
	.out(o0)
