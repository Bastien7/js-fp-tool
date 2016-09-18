// start coding !

function transpose(item) {
  if (item.subtype == 'noteOn') {
    item.noteNumber += 5;
  }
  return item;
}

function filter(midi) {
  //midi.tracks[2].forEach(transpose);
  return midi;
}

function sendMidiFile (ws) {

  function sendMidi(midi) {
    ws.send(JSON.stringify({type:'file', data:midi }));
  }

  F.loadRemote('midi/sml.mid', function(data) {
    midiFile = filter(MidiFile(data));

    debugger;

    sendMidi(midiFile);

    ws.onmessage = function (event) {
      if (event.type != 'play') return;
      var synth = Synth(44100);
      var replayer = Replayer(midiFile, synth);
      AudioPlayer(replayer);
    };
  })
}

F.createWebSocket('127.0.0.1').then(sendMidiFile);


