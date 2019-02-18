void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= rotate2d(u_time * 0.1);
    st += 0.5;
    st *= fbm(st * 2.) * (sin(u_time) + 2.) * 4.;
    st += fbm(st * 2.) * (sin(u_time) + 2.) * 4.;
    st *= rotate2d(u_time * 0.1);
    vec3 color = vec3(smoothstep(.28, .5, fbm(st)),
                      smoothstep(.21, .5, fbm(st + fbm(vec2(u_time)))),
                      smoothstep(.26, .5, fbm(st + fbm(vec2(-u_time)))));
    gl_FragColor = vec4(1. - color,1.0);
}
