# Genius Memory Game - Product Requirements Document (PRD)

## Visão Geral do Produto

O Genius Memory Game é uma implementação moderna do clássico jogo de memória "Simon". O jogo apresenta sequências de cores e sons que os jogadores devem memorizar e reproduzir em ordem crescente de dificuldade. O projeto inclui modos de jogo solo, competitivo (1vs1) e cooperativo, proporcionando diferentes experiências aos usuários.

## Objetivos de Negócio

1. Criar uma experiência de jogo envolvente que estimule habilidades de memória
2. Demonstrar a implementação de um jogo interativo com tecnologias modernas
3. Fornecer uma plataforma para jogabilidade solo e multijogador
4. Servir como projeto de portfólio para demonstração de habilidades técnicas

## Público-Alvo

- **Jogadores Casuais**: Pessoas que buscam um jogo simples e divertido para passar o tempo
- **Nostálgicos**: Pessoas que jogaram o jogo original "Simon" e buscam uma versão moderna
- **Jogadores Sociais**: Pessoas que gostam de jogar com amigos em modo competitivo ou cooperativo
- **Desenvolvedores**: Pessoas interessadas na implementação técnica do jogo

## Requisitos Funcionais

### Essenciais (MVP)

1. **Sistema de Jogo Básico**
   - Gerar sequências aleatórias de cores
   - Permitir input do usuário para repetir sequências
   - Aumentar a dificuldade progressivamente (sequências mais longas)
   - Fornecer feedback visual e sonoro para acertos e erros

2. **Modos de Jogo**
   - **Solo**: Jogador único tentando alcançar a maior pontuação
   - **1vs1**: Dois jogadores competindo, alternando turnos
   - **Cooperativo**: Dois jogadores trabalhando juntos, cada um completando parte da sequência

3. **Sistema de Autenticação**
   - Login com Google
   - Perfis de usuário com foto e nome

4. **Multiplayer em Tempo Real**
   - Criação de salas para jogos multiplayer
   - Sincronização em tempo real dos estados do jogo

### Desejáveis (Pós-MVP)

1. **Sistema de Ranking**
   - Tabela de líderes global
   - Histórico de pontuações do usuário

2. **Configurações Personalizáveis**
   - Ajuste de velocidade da sequência
   - Escolha de temas visuais e sonoros
   - Configurações de dificuldade

3. **Modos de Jogo Adicionais**
   - Modo de tempo limitado
   - Modo com padrões específicos

## Requisitos Não Funcionais

1. **Performance**
   - Tempo de carregamento inicial < 3 segundos
   - Tempo de resposta entre ações < 100ms
   - Sincronização multiplayer com latência < 500ms

2. **Compatibilidade**
   - Funcionamento em navegadores modernos (Chrome, Firefox, Safari, Edge)
   - Design responsivo para desktop, tablet e mobile
   - Suporte mínimo para os últimos 2 anos de versões de navegadores

3. **Segurança**
   - Autenticação segura via OAuth
   - Proteção contra manipulação de estado do jogo

4. **Disponibilidade e Escalabilidade**
   - Disponibilidade de 99.9%
   - Capacidade de lidar com picos de tráfego em horários de maior uso

## Arquitetura Técnica

O projeto utiliza uma arquitetura de monorepo com frontend e backend separados:

### Frontend
- **Tecnologias**: React, TypeScript, Vite
- **Hospedagem**: GitHub Pages
- **Principais Funcionalidades**:
  - Interface do jogo
  - Lógica de jogo client-side
  - Integração com autenticação Firebase
  - Comunicação com backend via REST API

### Backend
- **Tecnologias**: Node.js, Express, TypeScript
- **Hospedagem**: Render
- **Principais Funcionalidades**:
  - API REST para comunicação com frontend
  - Lógica de jogo server-side (para multiplayer)
  - Integração com banco de dados

### Integração
- Firebase Firestore para sincronização em tempo real
- Universal Cookies para gerenciamento de sessão

## Fluxo de Trabalho e Ambientes

O projeto utiliza dois ambientes separados:

1. **Produção** (branch `main`)
   - Frontend: https://danielobara.github.io/Genius-Memory-Game
   - Backend: https://genius-game-api-prod.onrender.com

2. **Homologação** (branch `develop`)
   - Frontend: https://danielobara.github.io/Genius-Memory-Game/dev
   - Backend: https://genius-game-api-dev.onrender.com

## Métricas de Sucesso

1. **Engajamento**
   - Tempo médio de sessão > 5 minutos
   - Taxa de retorno > 30%

2. **Performance Técnica**
   - Pontuação Lighthouse > 90 para Performance, Accessibility, Best Practices, SEO
   - Tempo de carregamento < 3 segundos

3. **Adoção de Usuários**
   - Crescimento mensal de novos usuários > 5%
   - Compartilhamentos nas redes sociais

## Cronograma

1. **Fase 1: MVP** (4 semanas)
   - Implementação do sistema de jogo básico
   - Implementação do modo solo
   - Interface inicial

2. **Fase 2: Multiplayer** (3 semanas)
   - Implementação dos modos 1vs1 e cooperativo
   - Integração com Firebase

3. **Fase 3: Refinamento** (2 semanas)
   - Melhorias de UI/UX
   - Testes e correção de bugs
   - Otimização de performance

4. **Fase 4: Lançamento** (1 semana)
   - Deploy para produção
   - Monitoramento inicial e ajustes

## Considerações Futuras

1. Implementação de aplicativo mobile nativo
2. Integração com outros provedores de autenticação
3. Modo de jogo com realidade aumentada
4. Sistema de recompensas e conquistas