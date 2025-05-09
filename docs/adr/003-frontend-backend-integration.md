# ADR 003: Integração entre Frontend (GitHub Pages) e Backend (Render)

## Status

Aceito

## Data

2025-05-06

## Contexto

O Genius Memory Game utiliza uma estrutura de monorepo com frontend e backend separados, hospedados em plataformas diferentes: GitHub Pages para o frontend e Render para o backend. Precisamos definir a estratégia de integração entre estes componentes, garantindo:

- Comunicação eficiente entre frontend e backend
- Configuração correta de CORS e políticas de segurança
- Gestão adequada das variáveis de ambiente para diferentes ambientes
- Experiência do usuário fluida em todos os ambientes

## Decisão

Adotaremos uma abordagem de integração baseada em API REST para comunicação entre frontend e backend, com as seguintes configurações específicas:

### 1. Comunicação Frontend-Backend

- Criar um serviço API no frontend que abstraia as chamadas ao backend
- Utilizar `fetch` para requisições HTTP
- Configurar URLs de API baseadas em variáveis de ambiente

### 2. Configuração de CORS no Backend

- Configurar o middleware CORS no Express para aceitar requisições de origens específicas
- Utilizar variáveis de ambiente para definir as origens permitidas por ambiente:
  - Produção: `https://danielobara.github.io`
  - Desenvolvimento: `http://localhost:3000`, `https://danielobara.github.io/Genius-Memory-Game-Dev`

### 3. Gestão de Variáveis de Ambiente

- Frontend:
  - `.env.development` para desenvolvimento local
  - `.env.production` para ambiente de produção
  - Scripts de build específicos para cada ambiente

- Backend:
  - Configurações no `render.yaml` para injeção de variáveis de ambiente
  - Arquivo `.env.example` para documentação

### 4. Estratégia de Autenticação

- Autenticação via Firebase Authentication
- Tokens JWT para comunicação segura entre frontend e backend
- Cookies para persistência de sessão

## Consequências

### Positivas

- **Desacoplamento**: Frontend e backend podem evoluir independentemente
- **Segurança**: Controle adequado de CORS e autenticação
- **Flexibilidade**: Suporte a múltiplos ambientes com configurações específicas
- **Manutenibilidade**: Abstração de serviço de API facilita mudanças futuras

### Negativas

- **Latência**: Comunicação via API HTTP pode introduzir latência
- **Complexidade**: Gerenciamento de múltiplos ambientes e configurações
- **Debugging**: Mais difícil depurar problemas de integração

### Mitigações

- Implementar caching no frontend para reduzir chamadas de API
- Criar documentação detalhada da API
- Implementar logging robusto para facilitar debuging
- Desenvolver testes de integração abrangentes

## Alternativas consideradas

1. **BFF (Backend For Frontend)**
   - Prós: Melhor otimização para necessidades específicas do frontend
   - Contras: Duplicação de código, maior complexidade de infraestrutura

2. **GraphQL**
   - Prós: Consultas mais flexíveis, redução de over-fetching
   - Contras: Curva de aprendizado, complexidade adicional na configuração

3. **SSR (Server-Side Rendering)**
   - Prós: Melhor SEO, carregamento inicial mais rápido
   - Contras: Maior complexidade, não necessário para um jogo

## Referências

- [CORS no Express](https://expressjs.com/en/resources/middleware/cors.html)
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [JWT Authentication Best Practices](https://auth0.com/blog/jwt-authentication-best-practices/)