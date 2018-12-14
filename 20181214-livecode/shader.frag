float c(float t) {
    vec2  r = u_resolution.xy, p = gl_FragCoord.xy - r*.5;
	float d = length(p) / r.y, c=1., x = pow(d, .1), y = atan(p.x, p.y) / 6.28;
	for (float i = 0.; i < 3.; ++i)    
		c = min(c, length(mod(vec2(x - t*i*.005, fract(y + i*.125)*.5)*20., 0.9)*2.-1.));
    return c;
}

void main() {
	gl_FragColor = vec4(c(u_time*4.)+sin(u_time), c(u_time*3.+sin(u_time)), c(u_time), 1.0);
}
