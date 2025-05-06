# ADR 001: Estrutura de Monorepo para Genius Memory Game

## Status

Aceito

## Data

2025-05-06

## Contexto

O projeto Genius Memory Game precisa de uma estrutura que suporte tanto o desenvolvimento frontend (React/TypeScript) quanto o backend (Node.js/Express), mantendo um gerenciamento de código eficiente e facilitando a colaboração entre desenvolvedores. Além disso, precisamos considerar as melhores práticas para deploy e manutenção.

## Decisão

Adotaremos uma arquitetura de monorepo onde o frontend e o backend serão mantidos no mesmo repositório, mas em diretórios separados. Esta abordagem nos permite compartilhar configurações comuns, facilitar o gerenciamento de dependências e manter o código relacionado em um único local.

### Estrutura de diretórios

```
/
├── frontend/            # Aplicação React + TypeScript
├── backend/             # API Node.js + Express
├── docs/                # Documentação (PRD, ADRs)
└── .github/workflows/   # Configurações de CI/CD
```

### Gerenciamento de pacotes

- Usaremos npm workspaces para gerenciar os pacotes em todo o monorepo
- Cada subprojeto (frontend/backend) terá seu próprio package.json
- Um package.json raiz coordenará os scripts comuns e as configurações compartilhadas

### Scripts comuns

O package.json na raiz conterá scripts para:
- Iniciar todos os serviços em modo de desenvolvimento
- Construir todos os projetos
- Executar linters e testes em todo o repositório

## Consequências

### Positivas

- **Desenvolvimento simplificado**: Trabalhar em um único repositório facilita a navegação e a manutenção do código
- **Mudanças sincronizadas**: Alterações em API e frontend podem ser desenvolvidas e implantadas juntas
- **Configurações compartilhadas**: Linters, formatadores e outras ferramentas podem ser configuradas de maneira consistente
- **CI/CD unificado**: Integração e deploy contínuos podem ser configurados para todo o projeto

### Negativas

- **Maior repositório**: O repositório será maior, podendo levar mais tempo para clonar
- **Complexidade de configuração**: A configuração de um monorepo pode ser mais complexa inicialmente
- **Risco de acoplamento**: Pode levar a um acoplamento indesejado entre frontend e backend se não for bem gerenciado

### Mitigações

- Manteremos uma clara separação de responsabilidades entre frontend e backend
- Usaremos interfaces bem definidas para comunicação entre frontend e backend
- Documentaremos adequadamente a estrutura e os padrões do monorepo

## Alternativas consideradas

1. **Repositórios separados para frontend e backend**
   - Prós: Separação clara, equipes podem trabalhar independentemente
   - Contras: Dificuldades em sincronizar alterações, overhead na manutenção de múltiplos repositórios

2. **Monolito (sem separação clara)**
   - Prós: Configuração mais simples, deploy único
   - Contras: Dificulta a escalabilidade, confunde responsabilidades

## Referências

- [Npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Monorepo Tools](https://monorepo.tools/)
- [GitHub monorepo with npm workspaces](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package)