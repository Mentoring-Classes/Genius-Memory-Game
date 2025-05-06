# Genius Memory Game

## Overview
Genius Game é uma implementação moderna do clássico jogo de memória "Simon". O projeto inclui modos **solo**, **1vs1** e **cooperativo multiplayer**, onde os jogadores testam sua memória e trabalho em equipe para seguir sequências de cores que ficam progressivamente mais difíceis.
Este projeto usa **React**, **TypeScript** e **Firebase** para sincronização em tempo real e jogabilidade responsiva.

## Estrutura do Monorepo
Este projeto é estruturado como um monorepo, com frontend e backend separados:

```
/
├── frontend/            # Aplicação React + TypeScript (hospedada no GitHub Pages)
├── backend/             # API Node.js + Express (hospedada no Render)
├── .github/workflows/   # Configurações de CI/CD para diferentes ambientes
└── render.yaml          # Configuração de deploy no Render
```

## Ambientes
O projeto suporta múltiplos ambientes utilizando branches diferentes:

- **Produção**: Branch `main` 
  - Frontend: https://danielobara.github.io/Genius-Memory-Game
  - Backend: https://genius-game-api-prod.onrender.com

- **Homologação**: Branch `develop`
  - Frontend: https://danielobara.github.io/Genius-Memory-Game/dev
  - Backend: https://genius-game-api-dev.onrender.com

## Features
- 🕹️ **Solo Mode**: Jogue sozinho e teste sua memória enquanto a sequência cresce.
- ⚔️ **1vs1 Mode**: Teste sua memória e enfrente seus amigos.
- 🤝 **Cooperative Mode**: Reveze-se com outro jogador, trabalhando juntos para completar sequências.
- 💾 **Real-Time Database**: Firebase Firestore garante que os estados do jogo sejam sincronizados entre os jogadores no modo cooperativo.
- 🔊 **Sound Effects**: Feedback para movimentos corretos e incorretos.
- 🎨 **Interface Amigável**: Design limpo e responsivo para uma experiência agradável.
- 🖼️ **Perfis de Jogadores**: Exibe nomes e avatares dos jogadores no modo multijogador.

## Technologies Used
- **Frontend**: React, TypeScript, CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Real-time Database**: Firebase Firestore
- **Hospedagem**: GitHub Pages (frontend) e Render (backend)

## Instruções de Desenvolvimento

### Requisitos
- Node.js (versão 18 ou superior)
- Git

### Configuração Inicial
1. Clone o repositório:
```bash
git clone https://github.com/DanielObara/Genius-Memory-Game.git
cd Genius-Memory-Game
```

2. Instale as dependências:
```bash
npm install
```

3. Configure os arquivos de ambiente:
   - Crie um arquivo `.env` no diretório `backend` baseado em `.env.example`
   - Os arquivos `.env.development` e `.env.production` já estão configurados no `frontend`

### Scripts Disponíveis

#### Raiz do Projeto
```bash
# Inicia ambos frontend e backend em modo de desenvolvimento
npm run dev

# Inicia apenas o frontend em modo de desenvolvimento
npm run dev:frontend

# Inicia apenas o backend em modo de desenvolvimento
npm run dev:backend

# Builds
npm run build:frontend  # Build do frontend
npm run build:backend   # Build do backend
```

#### Frontend
```bash
cd frontend

# Desenvolvimento
npm run dev

# Build
npm run build

# Deploy manual para GitHub Pages
npm run deploy
```

#### Backend
```bash
cd backend

# Desenvolvimento
npm run dev

# Build
npm run build

# Inicia o servidor de produção
npm start
```

## Fluxo de Trabalho Git
1. **Desenvolvimento**: Trabalhe na branch `develop` ou crie feature branches a partir dela
2. **Homologação**: Faça merge das features na branch `develop`
3. **Produção**: Quando o código estiver testado e pronto, faça merge de `develop` para `main`

## Deploy
- **Automatizado**: Push para as branches `main` ou `develop` aciona automaticamente o processo de CI/CD
- **Manual**: Use `npm run deploy` no diretório frontend para deploy manual no GitHub Pages

## How to Play
### Solo Mode
1. Start the game.
2. Make login with your google account.
3. Watch the sequence of colors carefully.
4. Repeat the sequence. The game gets harder as the sequence grows longer.
### 1vs1 Mode
1. Enter a room name to create or join a multiplayer session.
2. Players take turns repeating the sequence.
3. Whoever gets the sequence wrong first loses.
### Cooperative Mode
1. Enter a room name to create or join a multiplayer session.
2. Players take turns repeating the sequence.
3. Work together to complete the sequence and advance to the next round.

## Acknowledgments
- Inspired by the classic "Simon" game.
- [@DanielObara](https://github.com/DanielObara) for mentoring during development.

This project was developed by:
- [@ArtHirche](https://github.com/ArtHirche).
- [@Edugiyuu](https://github.com/Edugiyuu).