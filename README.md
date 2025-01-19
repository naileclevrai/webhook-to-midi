# 🎹 Webhook MIDI Connector

Ce projet permet de connecter un webhook à un port MIDI. Parfait pour envoyer des signaux MIDI à partir de requêtes HTTP ! 🌐🎶

## 🚀 Prérequis

1. **Node.js** et **npm** installés.
2. **loopMIDI** installé et configuré pour créer un port MIDI virtuel nommé `"Webhook to MIDI"`.
3. **Visual Studio C++ 2022** pour compiler les dépendances natives.

## 📦 Installation des Prérequis

### 1. Installation de loopMIDI 🎛️

**loopMIDI** est un utilitaire pour créer des ports MIDI virtuels, utile pour connecter des applications MIDI sans matériel externe.

- Téléchargez **loopMIDI** depuis [https://www.tobias-erichsen.de/software/loopmidi.html](https://www.tobias-erichsen.de/software/loopmidi.html).
- Installez l'application et ouvrez-la.
- Dans l'interface de loopMIDI, créez un nouveau port en le nommant **exactement** `"Webhook to MIDI"`. Vous verrez ce port apparaître dans la liste des ports disponibles.

### 2. Installation de Visual Studio C++ 2022 🛠️

**Visual Studio C++ 2022** est nécessaire pour compiler les dépendances natives utilisées par le module `midi`.

- Téléchargez et installez **Visual Studio 2022** depuis [https://visualstudio.microsoft.com/](https://visualstudio.microsoft.com/).
- Lors de l'installation, assurez-vous de sélectionner le **"Desktop development with C++"** pour installer les outils de compilation.

## ⚙️ Configuration du Projet

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/naileclevrai/webhook-to-midi.git
   cd webhook-to-midi
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

3. **Assurez-vous que le port MIDI est actif dans loopMIDI** : ouvrez loopMIDI et vérifiez que `"Webhook to MIDI"` est bien actif dans la liste.

## 🚀 Utilisation

1. **Lancer le serveur** :
   ```bash
   node app.js
   ```
   Le serveur sera par défaut à l'écoute sur le port `3000`, mais vous pouvez le modifier avec la variable d'environnement `PORT`.

2. **Envoyer un signal MIDI via le webhook** :
   Envoyez une requête `POST` à `http://localhost:3000/webhook` avec les données JSON suivantes :

   ```json
   {
       "note": 60,
       "velocity": 127
   }
   ```

   - `note` : le numéro MIDI de la note (optionnel, par défaut 60)
   - `velocity` : la vélocité de la note (optionnel, par défaut 127)

   Le serveur enverra alors un signal **Note ON**, puis un **Note OFF** après un délai de 50 ms.

## 📋 Exemples de Requêtes

Vous pouvez tester avec `curl` :
```bash
curl -X POST http://localhost:3000/webhook -H "Content-Type: application/json" -d '{"note": 64, "velocity": 100}'
```

Ou avec un outil comme **Postman** pour envoyer la requête en HTTP.

## 🛠 Dépendances

- **express** : pour créer l'API web.
- **midi** : pour envoyer des signaux MIDI.

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---
