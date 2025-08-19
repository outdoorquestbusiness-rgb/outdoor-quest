#!/bin/bash
set -e  # Quitte le script si une commande échoue

# Nom du repository Git
REPO_URL="https://github.com/outdoorquestbusiness-rgb/outdoor-quest.git"
REPO_NAME="outdoor-quest"
REPO_DIR="$HOME/$REPO_NAME"

# Supprime le repo existant si présent
if [ -d "$REPO_DIR" ]; then
    echo "Le dossier $REPO_DIR existe déjà. Suppression..."
    rm -rf "$REPO_DIR"
fi

# Clonage du repository
echo "Clonage du repository $REPO_URL..."
git clone "$REPO_URL" "$REPO_DIR"
cd "$REPO_DIR" || exit 1

# Installation des dépendances
echo "Installation des dépendances npm..."
npm install --silent

# Redémarrage du daemon
echo "Redémarrage du daemon..."
sudo systemctl daemon-reload

# Redémarrage du service
echo "Redémarrage du service outdoor-quest.service..."
sudo systemctl restart outdoor-quest.service

echo "Processus terminé avec succès !"
