#!/bin/bash
# Charge NVM
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Va dans le dossier de l'app
cd /root/trailquest-1

# Lance l'app
npm run dev
