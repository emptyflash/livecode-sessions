void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= 2.;
    st *= rotate2d(u_time*.1);
    st += u_time * .5;
    st += noise(st*2.) * abs(sin(u_time) + 2.)*7.;
    vec3 color = vec3(smoothstep(.26, .5, noise(st)),
                      smoothstep(.23, .5, noise(st + noise(vec2(u_time)))),
                      smoothstep(.28, .5, noise(st + noise(vec2(-u_time)))));
    gl_FragColor = vec4(1. - color,1.0);
}
