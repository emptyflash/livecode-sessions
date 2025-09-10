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
