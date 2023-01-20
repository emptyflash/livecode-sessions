// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-cond.js")

noise().repeat() // default branch
	.ifzero(osc(5, .2).repeat().kaleid(), // alternate branch, only when condidition is met
         () => Math.sin(5.1*time)
			         * Math.cos(7.1*time)) // value for the condition "if zero" to be tested
	.out(o0)
