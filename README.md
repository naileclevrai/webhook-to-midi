```markdown
# 🎹 Webhook MIDI Connector

Ce projet permet de connecter un webhook à un port MIDI. Parfait pour envoyer des signaux MIDI à partir de requêtes HTTP ! 🌐🎶

## 🚀 Installation

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/naileclevrai/webhook-to-midi.git
   cd webhook-to-midi
   ```

2. **Installez les dépendances** :
   ```bash
   npm install express midi
   ```

3. **Configuration du port MIDI** :  
   Assurez-vous que le port MIDI `"Webhook to MIDI"` est configuré avec un outil tel que **loopMIDI**.

## ⚙️ Utilisation

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

## ❗️ Prérequis

- **Node.js** et **npm** installés
- Un port MIDI nommé `"Webhook to MIDI"` actif

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

🎉 **Amusez-vous à créer de la musique automatisée !** 🎶
```
