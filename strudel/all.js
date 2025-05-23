//await loadOrc('github:kunstmusik/csound-live-code/master/livecode.orc')
//await samples('github:tidalcycles/Dirt-Samples/master')
//await samples('github:emptyflash/Samples/main')

await loadCsound`
instr SubFade 
  asig = vco2(p5, p4)
  asig += vco2(p5, p4 * 1.01)
  asig += vco2(p5, p4 * 0.995)
  asig *= 0.33 
  asig = zdf_ladder(asig, expseg(100, p3*0.5, 22000, p3*0.5, 100), 12) 
  asig = declick(asig)
  pan_verb_mix(asig, xchan:i("SubFade.pan", 0.5), xchan:i("SubFade.rvb", chnget:i("rvb.default")))
endin`

function fibonacci(num, memo) {
  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}
const _pisano = m => signal((t) => fibonacci(t) % m)
const pisano = mpat => reify(mpat).fmap(_pisano).innerJoin()
window.pisano = pisano

async function riffusion(sampleName, prompt, seed, steps, overrides) {
  overrides = overrides || {}
  steps = steps || 4;
  let firstPromise;
  let sampleList = [];
  for (let step = 1; step <= steps; step++) {
    let alpha = step/steps;
    let start = overrides["start"] || {}
    let end = overrides["end"] || {}
    delete overrides["start"]
    delete overrides["end"]
    let promise = fetch('https://us-central1-arched-keyword-306918.cloudfunctions.net/run-inference', {
      'headers': {
        'content-type': 'application/json',
      },
      'body': JSON.stringify({
        'worklet_input': {
            'alpha': alpha,
            'num_inference_steps': 50,
            'seed_image_id': 'og_beat',
            'mask_image_id': null,
            'start': {
                'prompt': prompt,
                'seed': seed,
                'denoising': 0.75,
                'guidance': 7,
                ...start,
            },
            'end': {
                'prompt': prompt,
                'seed': seed+1,
                'denoising': 0.75,
                'guidance': 7,
                ...end,
            },
            ...overrides,
        }
      }),
      'method': 'POST',
    })
      .then(r => r.json())
      .then(json => {
        sampleList[step-1] = json.output.audio
        samples({
          [sampleName]: sampleList
        })
      })
    if (!firstPromise) {
      firstPromise = promise
      await firstPromise
    }
  }
}
window.riffusion = riffusion

/*
const { MuseClient } = await import('https://muse-js.netlify.app/muse.js')

if (!window.museClient) {
    window.museClient = new MuseClient();
    window.museClient.enablePpg = true;
}
*/

let eegAverages = {}

async function startMuse() {
  await window.museClient.connect();
  await window.museClient.start();
  window.museClient.eegReadings.subscribe(reading => {
    eegAverages[reading.electrode] = reading.samples.reduce((a,b) => a+b, 0) / reading.samples.length;
  });
}
window.startMuse = startMuse;

function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const eeg = (electrode) => {
  return signal((t) => {
    let val = scale(eegAverages[electrode], -1000, 1000, 0, 1);
    return val;
  });
};
window.eeg = eeg;

function dec2bin(decimal) {
    let binary = [];
    let divisor;
    let remainder;
    while (Math.floor(decimal/2) > 0) {
        divisor = Math.floor(decimal/2);
        remainder = decimal % 2;
        binary.push(remainder);
        decimal = divisor;
    }
    divisor = Math.floor(decimal/2);
    //remainder = decimal % 2;
    binary.push(remainder);
    return binary.reverse();
}
window.dec2bin

async function initBytebeat() {
  let bytebeat = createParam('bytebeat')
  window.bytebeat = bytebeat;
  register('bytebeat', bytebeat)
  return await dough`
    let f
    let trigger = (value) => {
      f = Function('t', 'return ' + value.bytebeat)
    }
    let dsp = (t) => {
      t*=44000
      if(f)
        return ((f(t)&255)/127.5 - 1)/4
      else
       return 0
    }
  `
}
window.initBytebeat = initBytebeat
