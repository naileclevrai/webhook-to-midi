const express = require('express');
const midi = require('midi');

const app = express();
const midiOutput = new midi.Output();

const PORT = process.env.PORT || 3000;
const portName = "Webhook to MIDI"; // le nom dans loop midi 

function initializeMidiOutput() {
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
}

initializeMidiOutput();

app.use(express.json());

// verif data
function validateWebhookData(req, res, next) {
    const { note, velocity } = req.body;

    if (typeof note !== 'number' || note < 0 || note > 127) {
        return res.status(400).send('La note doit être un nombre entre 0 et 127.');
    }
    if (typeof velocity !== 'number' || velocity < 0 || velocity > 127) {
        return res.status(400).send('La vélocité doit être un nombre entre 0 et 127.');
    }
    next();
}

app.post('/webhook', validateWebhookData, (req, res) => {
    const midiChannel = 0;
    const note = req.body.note || 60;
    const velocity = req.body.velocity || 127;

    try {
        // envois midi
        midiOutput.sendMessage([0x90 + midiChannel, note, velocity]);
        console.log(`Signal MIDI Note ON envoyé : canal ${midiChannel}, note ${note}, vélocité ${velocity}.`);

        // arret du midi apres 50ms a modif si vous voulez plus longtemps
        setTimeout(() => {
            midiOutput.sendMessage([0x80 + midiChannel, note, 0]);
            console.log(`Signal MIDI Note OFF envoyé : canal ${midiChannel}, note ${note}.`);
        }, 50);

        res.status(200).send('Signal MIDI envoyé avec arrêt de 50 ms');
    } catch (error) {
        console.error('Erreur lors de l\'envoi du signal MIDI :', error);
        res.status(500).send('Erreur interne lors de l\'envoi du signal MIDI.');
    }
});

process.on('SIGINT', () => {
    console.log('Fermeture du port MIDI et arrêt du serveur...');
    midiOutput.closePort();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`Serveur Webhook en écoute sur le port ${PORT}`);
});
