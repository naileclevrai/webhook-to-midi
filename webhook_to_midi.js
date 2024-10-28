const express = require('express');
const midi = require('midi');

const app = express();
const midiOutput = new midi.Output();

const portName = "Webhook to MIDI";
let portFound = false;
for (let i = 0; i < midiOutput.getPortCount(); i++) {
    if (midiOutput.getPortName(i) === portName) {
        midiOutput.openPort(i);
        console.log(`Connecté au port MIDI : ${portName}`);
        portFound = true;
        break;
    }
}

if (!portFound) {
    console.error(`Le port MIDI "${portName}" n'a pas été trouvé.`);
    process.exit(1);
}

app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log("Webhook reçu:", req.body);

    const midiChannel = 0;
    const note = req.body.note || 60;
    const velocity = req.body.velocity || 127;

    midiOutput.sendMessage([0x90 + midiChannel, note, velocity]);
    console.log(`Signal MIDI Note ON envoyé : canal ${midiChannel}, note ${note}, vélocité ${velocity}.`);

    setTimeout(() => {
        midiOutput.sendMessage([0x80 + midiChannel, note, 0]);
        console.log(`Signal MIDI Note OFF envoyé : canal ${midiChannel}, note ${note}.`);
    }, 50);

    res.status(200).send('Signal MIDI envoyé avec arrêt de 50 ms');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur Webhook en écoute sur le port ${PORT}`);
});
