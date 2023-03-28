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