void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st -= 0.5;
    st *= 10. * clamp(abs(sin(u_time / 10.)), 1. / 10., 1.);
    if (u_time / 10. > 3.14 / 2.) {
        st *= rotate2d(u_time - (3.14 / 2. * 10.));
    }
    st += 0.5;
    st = fract(st);
    vec3 color = vec3(0.);
    for (int i = 0; i < 3; i++) {
        float off = float(i) / 4.;
        float c = box(st, vec2(noise(st + u_time + off)));
        color[i] = pow(c, c);
    }
    if (color.r == 1. && color.g == 1. && color.b == 1.) {
        //color = vec3(0.);
    }
    gl_FragColor = vec4(color, 1.0);
}
