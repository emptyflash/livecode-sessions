// functions that are only used within other functions

module.exports = {
  _luminance: {
    type: 'util',
    glsl: `float _luminance(vec3 rgb){
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      return dot(rgb, W);
    }`
  },
  _noise: {
    type: 'util',
    glsl: `
    //	Simplex 3D Noise
    //	by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float _noise(vec3 v){
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
    `
  },


  _rgbToHsv: {
    type: 'util',
    glsl: `vec3 _rgbToHsv(vec3 c){
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }`
  },
  _hsvToRgb: {
    type: 'util',
    glsl: `vec3 _hsvToRgb(vec3 c){
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }`
  },
  
  
  _sdf: {
    type: 'util',
    glsl: `

mat4 _sdf_rotateX(float theta) {
    float c = cos(theta);
    float s = sin(theta);

    return mat4(
        vec4( 1,  0,  0,  0),
        vec4( 0,  c, -s,  0),
        vec4( 0,  s,  c,  0),
        vec4( 0,  0,  0,  1)
    );
}

mat4 _sdf_rotateY(float theta) {
    float c = cos(theta);
    float s = sin(theta);

    return mat4(
        vec4( c,  0,  s,  0),
        vec4( 0,  1,  0,  0),
        vec4(-s,  0,  c,  0),
        vec4( 0,  0,  0,  1)
    );
}

mat4 _sdf_rotateZ(float theta) {
    float c = cos(theta);
    float s = sin(theta);

    return mat4(
        vec4( c, -s,  0,  0),
        vec4( s,  c,  0,  0),
        vec4( 0,  0,  1,  0),
        vec4( 0,  0,  0,  1)
    );
}

float _sdf_distance_from_sphere(in vec3 p0, in vec3 amount)
{
    return length(p0) - amount.x + amount.z * _noise(p0);
}

float _sdf_distance_from_torus(in vec3 p0, in vec3 amount)
{
    vec2 q = vec2(length(p0.xz) - amount.x, p0.y);
    return length(q) - amount.y + amount.z * _noise(p0);
}

float _sdf_map_the_world(float s, in vec3 p, in vec3 angles, in vec3 amount)
{
    vec3 px  = (_sdf_rotateX(angles.x) * vec4(p,  1.0)).xyz;
    vec3 py  = (_sdf_rotateY(angles.y) * vec4(px, 1.0)).xyz;
    vec3 pz  = (_sdf_rotateZ(angles.z) * vec4(py, 1.0)).xyz;
    if(s < 0.01)
        return _sdf_distance_from_sphere(pz, amount);
    else if(s > 0.99)
        return _sdf_distance_from_torus(pz, amount);
    else
        return mix(_sdf_distance_from_sphere(pz, amount),
                   _sdf_distance_from_torus(pz, amount), s);
}

vec3 _sdf_calculate_normal(float s, in vec3 p, in vec3 angles, in vec3 amount)
{
    const vec3 small_step = vec3(0.01, 0.0, 0.0);

    float gradient_x = _sdf_map_the_world(s, p + small_step.xyy, angles, amount) - _sdf_map_the_world(s, p - small_step.xyy, angles, amount);
    float gradient_y = _sdf_map_the_world(s, p + small_step.yxy, angles, amount) - _sdf_map_the_world(s, p - small_step.yxy, angles, amount);
    float gradient_z = _sdf_map_the_world(s, p + small_step.yyx, angles, amount) - _sdf_map_the_world(s, p - small_step.yyx, angles, amount);

    return normalize(vec3(gradient_x, gradient_y, gradient_z));
}

// vec3 _sdf_ray_march(sampler2D tex, float s, in vec3 ro, in vec3 rd, in vec3 angles, in vec3 amount)
vec3 _sdf_ray_march(sampler2D tex, vec4 _c0, float s, in vec3 ro, in vec3 rd, in vec3 angles, in vec3 amount)
{
    float total_distance_traveled = 0.0;
    const int NUMBER_OF_STEPS = 32;
    const float MINIMUM_HIT_DISTANCE = 0.01;
    const float MAXIMUM_TRACE_DISTANCE = 100.0;
    const vec3 ambientColor  = vec3(0.05, 0.05, 0.10);
    const vec3 specularColor = vec3(0.7, 0.7, 0.75);

    for (int i = 0; i < NUMBER_OF_STEPS; ++i)
    {
        vec3 current_position = ro + total_distance_traveled * rd;

        float distance_to_closest = _sdf_map_the_world(s, current_position, angles, amount);

        if (distance_to_closest < MINIMUM_HIT_DISTANCE) 
        {
            vec3 normal = _sdf_calculate_normal(s, current_position, angles, amount);
            vec3 light_position = vec3(3.0, 5.0, 3.0);
            vec3 direction_to_light = normalize(current_position - light_position);
            float diffuse_intensity = dot(normal, direction_to_light);
            vec3 reflectionDirection = normalize(reflect(-normalize(direction_to_light), normalize(normal)));
            vec3 diffuseColor = texture2D(tex, (reflectionDirection.xy)).xyz;
//             vec3 diffuseColor = _c0.xyz;
            if(diffuse_intensity > 0.0) {
                float specular = dot(normalize(normal), reflectionDirection);
                if(specular > 0.0) {
                    return vec3(ambientColor + diffuse_intensity * diffuseColor + pow(specular, 128.0) * specularColor);
                }
                else {
                    return vec3(ambientColor + diffuse_intensity * diffuseColor);
                }
            }
            else {
                return ambientColor * diffuseColor;
            }
        }

        if (total_distance_traveled > MAXIMUM_TRACE_DISTANCE)
        {
            break;
        }
        total_distance_traveled += distance_to_closest;
    }
    return vec3(0.0);
}
    `
  }
}
