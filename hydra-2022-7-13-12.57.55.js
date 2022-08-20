// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// moire
// by Olivia Jack
// twitter: @_ojack_

pattern = () => osc(200, 0)
	.kaleid(200)
a.show()
let audioTime = 0;
update = () => {
  audioTime += a.fft[2]<0.1?0:a.fft[2];
  console.log(a.fft[2])
}
pattern()
	.scrollY(()=>audioTime, 0.000)
	.mult(pattern())
	//.modulateScale(o0, 0.1)
	.out()