float tri(vec2 st, float scale, float size) {
    st *= scale;
    st -= size;
    float a = atan(st.x, st.y) + 3.14;
    float r = 6.28 / 3.;

    float d = cos(floor(.5+a/r)*r-a) * length(st);
    return 1.0-smoothstep(.4, .41, d);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float t1 = tri(st + vec2(0., -.18), 3., 1.5);
    float t2 = tri(st + vec2(0., -.08), 3., 1.5);
    float t3 = tri(st + vec2(0., 0.02), 3., 1.5);
    float t4 = tri(st + vec2(0., .12), 3., 1.5);
    float t5 = tri(st + vec2(0., .22), 3., 1.5);
    float t6 = tri(st + vec2(0., .32), 3., 1.5);
    float t = t1 + t2 + t3 + t4 + t5 + t6;
    st -= 1.;
    st *= 5.;
    //st *= rotate2d(u_time);
    float r = fbm(st / (abs(sin(u_time * .1)) + .3));
    float g = fbm(st / (abs(cos(u_time * .1)) + .3));
    if (r > g) {
        g = 0.;
    } else {
        r = 0.;
    }
    vec3 color = vec3(r * t, g * t, 0.);
    gl_FragColor = vec4(color, 1.0);
}
