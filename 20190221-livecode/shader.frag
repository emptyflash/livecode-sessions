void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec2 q = vec2(0.);
    q.x = fbm( st + 1.00*u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + 0.001 * u_time * (.5 - st));
    r.y = fbm( st + 1.0*q + 0.001 * u_time * (.5 - st));

    float f = fbm(st+r);

    vec3 color = f * mix(vec3(0.101961,0.619608,0.666667),
                         vec3(0.975,0.975,0.728),
                         f*f*f);
    float pct = circle(st, 0.9);
    float pct2 = circle(st, 0.1);

    gl_FragColor = vec4(color / pct - pct2, 1.);
}
