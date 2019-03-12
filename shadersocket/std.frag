precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform int u_audio[16];
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

/*******************
 * HYDRA FUNCTIONS *
 *****************(*/

vec2 kaleid(vec2 st, float nSides) {
    st -= 0.5;
    float r = length(st);
    float a = atan(st.y, st.x);
    float pi = 2.*3.1416;
    a = mod(a,pi/nSides);
    a = abs(a-pi/nSides/2.);
    return r*vec2(cos(a), sin(a));
}

vec2 modulateKaleid(vec2 st, vec4 c1, float nSides){
    st -= 0.5;
    float r = length(st);
    float a = atan(st.y, st.x);
    float pi = 2.*3.1416;
    a = mod(a,pi/nSides);
    a = abs(a-pi/nSides/2.);
    return (c1.r+r)*vec2(cos(a), sin(a));
}

vec2 modulate(vec2 st, vec4 c1, float amount){
    return st + c1.xy*amount;
}

vec2 modulateRotate(vec2 st, vec4 c1, float multiple, float offset){
    vec2 xy = st - vec2(0.5);
    float angle = offset + c1.x * multiple;
    xy = mat2(cos(angle),-sin(angle), sin(angle),cos(angle))*xy;
    xy += 0.5;
    return xy;
}

vec4 blend(vec4 c0, vec4 c1, float amount){
    return c0*(1.0-amount)+c1*amount;
}

vec4 layer(vec4 c0, vec4 c1){
    return vec4(mix(c0.rgb, c1.rgb, c1.a), c0.a+c1.a);
}

vec4 mult(vec4 c0, vec4 c1, float amount){
    return c0*(1.0-amount)+(c0*c1)*amount;
}
  
vec4 diff(vec4 c0, vec4 c1){
    return vec4(abs(c0.rgb-c1.rgb), max(c0.a, c1.a));
}

vec2 scale(vec2 st, float amount, float xMult, float yMult){
    vec2 xy = st - vec2(0.5);
    xy*=(1.0/vec2(amount*xMult, amount*yMult));
    xy+=vec2(0.5);
    return xy;
}

vec4 osc(vec2 _st, float freq, float sync, float offset){
    vec2 st = _st;
    float r = sin((st.x-offset/freq+u_time*sync)*freq)*0.5  + 0.5;
    float g = sin((st.x+u_time*sync)*freq)*0.5 + 0.5;
    float b = sin((st.x+offset/freq+u_time*sync)*freq)*0.5  + 0.5;
    return vec4(r, g, b, 1.0);
}

//	Simplex 3D Noise
//	by Ian McEwan, Ashima Arts
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) { 
    return 1.79284291400159 - 0.85373472095314 * r;
}

float _noise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
}

vec4 simplexNoise(vec2 st, float scale, float offset) {
    return vec4(vec3(_noise(vec3(st*scale, offset*u_time))), 1.0);
}
