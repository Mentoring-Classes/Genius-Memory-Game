# ADR 002: Ambientes Separados Usando Branches Diferentes

## Status

Aceito

## Data

2025-05-06

## Contexto

O desenvolvimento do Genius Memory Game requer ambientes separados para desenvolvimento/homologação e produção. Precisamos determinar a melhor estratégia para gerenciar esses ambientes, considerando:

- A necessidade de testes em um ambiente de homologação antes da implantação em produção
- O uso de um monorepo para gerenciar o frontend e o backend
- Serviços de hospedagem distintos (GitHub Pages para frontend e Render para backend)
- A necessidade de separar configurações e variáveis de ambiente entre os ambientes

## Decisão

Utilizaremos branches diferentes no repositório para representar e gerenciar os ambientes separados:

- Branch `main`: Ambiente de produção
- Branch `develop`: Ambiente de desenvolvimento/homologação

Esta abordagem será implementada com as seguintes configurações:

### 1. Hospedagem e Deployment

#### Frontend (GitHub Pages):
- Produção: Publicado a partir da branch `main` na URL principal
- Homologação: Publicado a partir da branch `develop` em um subdiretório `/dev`

#### Backend (Render):
- Produção: Serviço "genius-game-api-prod" conectado à branch `main`  
- Homologação: Serviço "genius-game-api-dev" conectado à branch `develop`

### 2. CI/CD (GitHub Actions)

- Workflows separados para cada ambiente
- Configurados para fazer deploy automático quando as respectivas branches forem atualizadas

### 3. Configuração de Ambientes

- Arquivos `.env.development` e `.env.production` para o frontend
- Configurações específicas no `render.yaml` para os diferentes ambientes do backend

## Consequências

### Positivas

- **Isolamento claro**: Ambientes completamente separados para evitar impactos mútuos
- **Fluxo de trabalho GitFlow**: Alinhamento com o fluxo de trabalho padrão do GitFlow
- **Testes em homologação**: Capacidade de testar em um ambiente completo antes de promover para produção
- **Deploy automatizado**: CI/CD configurado para automatizar o deployment para os ambientes corretos

### Negativas

- **Complexidade de branches**: Necessidade de gerenciar múltiplas branches
- **Overhead de manutenção**: Manutenção de configurações duplicadas para cada ambiente
- **Potencial para divergência**: Risco de ambientes ficarem dessincronizados

### Mitigações

- Implementar revisões de código rigorosas antes de merges para a branch `main`
- Documentar claramente o fluxo de trabalho e o processo de promoção entre ambientes
- Utilizar variáveis de ambiente e configurações específicas para cada ambiente

## Alternativas consideradas

1. **Deploy baseado em tags**
   - Prós: Menos branches para gerenciar
   - Contras: Menos flexibilidade para manter versões diferentes entre ambientes

2. **Ambientes totalmente separados (repositórios diferentes)**
   - Prós: Isolamento completo
   - Contras: Dificuldade em sincronizar código e manter consistência

3. **Feature flags**
   - Prós: Código único com funcionalidades habilitadas condicionalmente
   - Contras: Maior complexidade no código, potencial para bugs

## Referências

- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [GitFlow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Render Environment Configuration](https://render.com/docs/environment-variables)
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)