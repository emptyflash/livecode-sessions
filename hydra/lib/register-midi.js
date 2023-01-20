// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// see: https://github.com/hydra-synth/hydra/blob/main/docs/midi.md
// register WebMIDI
navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);
function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    for (var input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage;
    }
}
function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}
//create an array to hold our cc values and init to a normalized value
cc=Array(128).fill(0.5)
getMIDIMessage = function(midiMessage) {
    var arr = midiMessage.data
    var index = arr[1]
    var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
		console.log('Midi received on cc#' + index + ' value:' + arr[2] + ' ' + val)    // uncomment to monitor incoming Midi
    cc[index]=val
}
