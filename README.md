# 📰 Veille PanneauPocket

Ce projet est un outil de veille locale qui agrège automatiquement les publications récentes de plusieurs communes depuis le site [PanneauPocket](https://www.panneaupocket.com/), malgré les restrictions CORS. Il permet d'afficher les alertes, messages municipaux et informations diverses sous forme de tableau filtrable.

---

## 🎯 Objectif

Créer une interface web simple permettant d'afficher les dernières publications (alertes, actualités...) de plusieurs communes françaises, en contournant les limitations CORS via un proxy local.

---

## ✅ Fonctionnalités

- Affichage d’un tableau dynamique des publications issues de plusieurs communes.
- Filtrage des publications par commune via des cases à cocher.
- Contournement du CORS grâce à un serveur proxy local Node.js.
- Extraction automatisée des données depuis les pages HTML publiques de PanneauPocket.
- Affichage uniquement des publications récentes (sur 7 jours).

---

## 🧱 Structure du projet

/panneaupocket-veille
├── index.html # Interface principale
├── style.css # Styles de la page
├── script.js # Logique de chargement des publications
├── server.js # Proxy Node.js pour contourner le CORS
├── communes.json # Liste des communes à surveiller
└── README.md # Ce fichier

yaml
Copier
Modifier

---

## 🚀 Installation locale

1. **Cloner ce dépôt :**

```bash
git clone https://github.com/votre-utilisateur/panneaupocket-veille.git
cd panneau-pocket-veille
Installer les dépendances du proxy :

bash
Copier
Modifier
npm install express cors node-fetch
Lancer le serveur proxy :

bash
Copier
Modifier
node server.js
Le proxy sera accessible à l'adresse http://localhost:3000.

Ouvrir le fichier index.html dans un navigateur
(avec Live Server ou en double-cliquant depuis l’explorateur de fichiers).

🛠️ Technologies utilisées
HTML / CSS / JavaScript Vanilla

Node.js + Express pour le proxy

DOMParser pour parser le HTML

Live Server (recommandé pour test local rapide)

📝 communes.json
Le fichier communes.json contient un tableau d'objets, chacun représentant une commune :

json
Copier
Modifier
[
  {
    "nom": "SDIS 01",
    "url": "https://app.panneaupocket.com/ville/414371844-sdis-01-01000"
  },
  {
    "nom": "Jasseron",
    "url": "https://app.panneaupocket.com/ville/320123988-jasseron-01250"
  },
  {
    "nom": "Tossiat",
    "url": "https://app.panneaupocket.com/ville/1023434403-tossiat-01250"
  }
]
🔧 Améliorations possibles
Ajout d’un champ de recherche.

Archivage des publications.

Notification ou alerte automatique.

Hébergement du proxy (ex. : via Render, Railway…).

👤 Auteur
Projet réalisé avec l’aide de ChatGPT pour le développement collaboratif, le débogage et la documentation.
