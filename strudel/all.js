await loadOrc('github:kunstmusik/csound-live-code/master/livecode.orc')
await samples('github:tidalcycles/Dirt-Samples/master')
await samples('github:emptyflash/Samples/main')

if (!document.getElementById('hydra-canvas')) {
  await import('https://unpkg.com/hydra-synth')
  const testCanvas = document.getElementById('test-canvas')
  const hydraCanvas = testCanvas.cloneNode(true)
  hydraCanvas.id = 'hydra-canvas'
  testCanvas.after(hydraCanvas)
  new Hydra({ canvas:hydraCanvas, detectAudio: false })
  s0.init({src: testCanvas})
}

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
        sampleList[step] = json.output.audio
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

const { MuseClient } = await import('https://muse-js.netlify.app/muse.js')

if (!window.museClient) {
    window.museClient = new MuseClient();
    window.museClient.enablePpg = true;
}

async function startMuse() {
  await window.museClient.connect();
  await window.museClient.start();
}

let eegAverages = {}
window.museClient.eegReadings.subscribe(reading => {
  eegAverages[reading.electrode] = reading.samples.reduce((a,b) => a+b, 0) / reading.samples.length;
});


function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const eeg = (electrode) => {
  return signal((t) => {
    let val = scale(eegAverages[electrode], -1000, 1000, 0, 1);
    return val;
  })
}
