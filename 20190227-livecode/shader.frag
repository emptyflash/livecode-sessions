void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st *= vec2(fbm(st * 2. + u_time), fbm(vec2(noise(st)) * 2. - u_time));
    vec4 n1 = simplexNoise(st, 1., 0.);
    vec4 c1 = osc(st, 60., .2, 900.);
    vec4 c2 = blend(c1, n1, .1);
    vec2 uv = modulateRotate(st, c2, 1., 0.);
    vec4 c3 = osc(uv, 61., .2, 901.);
    vec4 c4 = diff(c3, c2);
    gl_FragColor = c4;
}
