a.show()

src(o0)
	//.diff(osc(20,.1,127).hue(0.1), 0.4)
	//.colorama()
	.mask(shape(4, .9))
	//.colorama(0.04)
	//.hue(0.4)
	.invert()
	.scale(0.9)
	//.modulateHue(o0, 10)
	.scrollX(0.32, 0)
	.rotate(1.74, 0)
/*
	.scrollX(() => {
		let v = mouse.y / 1080;
  		console.log(v);
  		return v;
	}, 0)
	.rotate(() => {
		let v = 2 * Math.PI * (mouse.x / 1920)
		console.log(v);
		return v;
	}, 0)
*/
	.kaleid(6)
	.out()