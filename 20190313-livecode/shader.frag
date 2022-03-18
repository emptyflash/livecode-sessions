// HELLO EVERYONE
    // Go to local.cameron.pizza on your phones

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec4 c1 = simplexNoise(st, .1, .1);
    vec4 c2 = osc(st, 60. * u_audio[0] / 255., .1, 900. * u_audio[3] / 255.);
    vec2 uv = modulateRotate(st, c2, 1., 10.);
    vec4 c3 = osc(uv, 50., .2, 900. * u_audio[0] / 255.);
    vec4 c4 = simplexNoise(st, 100., 2.);
    vec4 c5 = diff(c4, c3);
    vec2 uv2 = modulate(uv, c5, .1);
    vec4 c6 = osc(uv2, 50., .2 * u_audio[0] / 255., 17. * u_audio[1] / 255.);
    gl_FragColor = c1;
}
