# 🎥 Webhook MIDI Connector for Livestreams

Ce projet permet de connecter des webhooks à un port MIDI, idéal pour contrôler des projecteurs de spectacle via des logiciels DMX compatibles avec MIDI, tels que **dot2** et d'autres. Grâce à cet outil, vous pouvez automatiser vos éclairages et effets directement à partir d'événements provenant d'outils comme **Tikfinity**. 🌟🎛️

---

## ✨ Fonctionnalités

- **Contrôle DMX via MIDI** : Fonctionne avec tout logiciel DMX compatible MIDI.
- **Webhook intégré** : Transformez des requêtes HTTP en signaux MIDI.
- **Configuration facile** : Intégration directe avec des outils de livestream comme Tikfinity.

---

## 💡 Logiciels DMX Compatibles

Voici une liste de logiciels DMX compatibles MIDI que vous pouvez utiliser :

- **dot2** (MA Lighting)
- **QLC+**
- **Lightkey**
- **ShowXpress** (Chauvet DJ)
- **Freestyler DMX**
- **Hog 4** (High End Systems)

Ces logiciels vous permettent de configurer des actions DMX déclenchées par des signaux MIDI envoyés depuis ce projet.

---

## 🚀 Prérequis

1. **Node.js** et **npm** installés.
2. **loopMIDI** installé et configuré pour créer un port MIDI virtuel nommé `"Webhook to MIDI"`.
3. **Tikfinity** pour envoyer des webhooks basés sur vos événements de livestream.
4. (Optionnel) **Visual Studio C++ 2022** pour compiler les dépendances natives.

---

## ⚙️ Configuration et Installation

### 1. Préparer le port MIDI virtuel avec loopMIDI

- Téléchargez et installez **loopMIDI** depuis [https://www.tobias-erichsen.de/software/loopmidi.html](https://www.tobias-erichsen.de/software/loopmidi.html).
- Lancez l'application et créez un nouveau port nommé **exactement** `"Webhook to MIDI"`.

### 2. Installer Tikfinity

- Téléchargez et installez **Tikfinity**
- Ouvrez Tikfinity et allez dans l'onglet **Actions > Create New Action**.
  - Donnez un nom à votre action.
  - Cochez l'option **Send Webhook**.
  - Dans le champ URL du webhook, entrez : 
    ```
    http://<votre_ip>:3000/webhook
    ```
    Remplacez `<votre_ip>` par l'adresse IP publique de votre machine ou `localhost` si vous testez localement.
  - Configurez l'action et associez-la aux événements souhaités (par exemple : un cadeau reçu, un abonné, etc.).

---

## 🚀 Utilisation

1. **Lancer le serveur** :
   ```bash
   node app.js
   ```
   Par défaut, le serveur écoute sur le port `3000`.

2. **Configurer vos actions Tikfinity** : Assurez-vous que Tikfinity envoie les webhooks au bon port.

3. **Tester avec un événement** : Associez une action Tikfinity à un événement (par exemple : cadeau TikTok). Le signal MIDI correspondant sera envoyé et votre logiciel DMX interprétera l'action.

---

## 📋 Exemples de Requêtes

Pour tester directement le webhook, envoyez une requête `POST` :

```bash
curl -X POST http://localhost:3000/webhook -H "Content-Type: application/json" -d '{"note": 64, "velocity": 100}'
```

---

## 🤝 Contributions

- Les **pull requests** et les **issues** sont les bienvenus !
- Si ce projet vous plaît, pensez à lui donner une ⭐ sur GitHub.

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

--- 
