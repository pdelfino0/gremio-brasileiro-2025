# Documentação de Planejamento - Grêmio Brasileirão 2025

## 1. Descrição do Projeto

O projeto **Grêmio Brasileirão 2025** é uma aplicação web desenvolvida em React que exibe a tabela de jogos do Grêmio no Campeonato Brasileiro de 2025. A aplicação oferece funcionalidades como visualização dos jogos divididos em primeiro e segundo turno, filtros para jogos em casa e fora, e um design responsivo.

### Tecnologias Principais:
- **Frontend**: React 19.1.0 com Vite 6.3.5
- **Build Tool**: Vite
- **Estilização**: CSS puro
- **Containerização**: Docker + Docker Compose
- **Servidor Web**: Nginx (Alpine)
- **Infraestrutura**: AWS EC2, Terraform
- **CI/CD**: GitHub Actions

## 2. Objetivos e Requisitos

### Objetivos Técnicos:
- Implementar uma aplicação web moderna e responsiva para acompanhar os jogos do Grêmio
- Automatizar o processo de build, teste e deploy da aplicação
- Provisionar infraestrutura na AWS de forma automatizada usando Infrastructure as Code
- Garantir alta disponibilidade da aplicação com IP fixo
- Implementar pipeline de CI/CD completo com verificações de segurança

### Requisitos Funcionais:
- Exibir tabela de jogos do Grêmio no Brasileirão 2025
- Navegação entre primeiro e segundo turno
- Filtros para jogos em casa e fora de casa
- Interface responsiva para diferentes dispositivos

### Requisitos Não-Funcionais:
- **Performance**: Build otimizado com Vite
- **Segurança**: Scan de vulnerabilidades com Trivy no pipeline
- **Disponibilidade**: IP fixo com Elastic IP na AWS
- **Escalabilidade**: Containerização com Docker
- **Manutenibilidade**: Infrastructure as Code com Terraform

## 3. Plano de Integração Contínua (CI) e Deploy

O projeto possui dois workflows separados no GitHub Actions com execução sequencial:

### 3.1 Pipeline de CI (`.github/workflows/ci-cd.yml`)
**Executado em**: Push e Pull requests para branch `main`

#### Job: lint-and-build
- **Ambiente**: ubuntu-latest
- **Node.js**: Versão 20 com cache npm
- **Permissões**: `contents: read`, `packages: write`
- **Etapas**:
  1. Checkout do código (`actions/checkout@v4`)
  2. Configuração do Node.js (`actions/setup-node@v4`)
  3. Instalação de dependências (`npm ci`)
  4. Execução do linter (`npm run lint`)
  5. Build da aplicação (`npm run build`)
  6. **Condicional** (apenas push na main):
     - Setup Docker Buildx (`docker/setup-buildx-action@v3`)
     - Login no GitHub Container Registry (`docker/login-action@v3`)
     - Extração de metadata (`docker/metadata-action@v5`)
     - Build e push da imagem Docker (`docker/build-push-action@v5`)

### 3.2 Pipeline de Deploy (`.github/workflows/deploy.yml`)
**Executado em**: Após sucesso do workflow CI (via `workflow_run`)

#### Job: deploy
- **Ambiente**: ubuntu-latest
- **Dependência**: CI workflow completado com sucesso
- **Etapas**:
  1. Deploy via SSH para EC2 (`appleboy/ssh-action@v1.0.3`)

#### Script de Deploy no Servidor:
```bash
# Definir o diretório do projeto
PROJECT_DIR="/home/ec2-user/gremio-brasileirao-2025"

# Remover diretório se existir (deploy limpo a cada execução)
if [ -d "$PROJECT_DIR" ]; then
  rm -rf "$PROJECT_DIR"
fi

# Clone do repositório atualizado
git clone https://github.com/pdelfino0/gremio-brasileiro-2025.git "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Verificar se docker-compose.yml existe
if [ ! -f "docker-compose.yml" ]; then
  echo "❌ ERRO: docker-compose.yml não encontrado!"
  exit 1
fi

# Login no GitHub Container Registry no servidor
echo "$GITHUB_TOKEN" | docker login ghcr.io -u $GITHUB_ACTOR --password-stdin

# Parar containers existentes
docker compose down || true

# Pull da imagem mais recente usando docker-compose
docker compose pull

# Cleanup de imagens antigas
docker image prune -f

# Iniciar com a nova imagem
docker compose up -d

# Verificar containers rodando
docker ps

echo "Deploy realizado com sucesso em: $(date)"
```

### Secrets Necessários:
- `EC2_HOST`: IP público da instância EC2
- `EC2_USERNAME`: Usuário SSH (ec2-user)
- `EC2_SSH_KEY`: Chave SSH privada para acesso

### Ferramentas Utilizadas:
- **GitHub Actions**: Orquestração dos pipelines
- **Node.js 20**: Runtime da aplicação
- **ESLint**: Verificação de qualidade do código
- **Docker Buildx**: Build multi-plataforma de imagens
- **GitHub Container Registry (GHCR)**: Registry de imagens Docker
- **Docker Compose**: Orquestração de containers no servidor
- **SSH**: Deploy remoto na EC2
- **Nginx**: Servidor web para aplicação React

## 4. Especificação da Infraestrutura Necessária

A infraestrutura é provisionada na **AWS** usando **Terraform** e inclui os seguintes recursos:

### Recursos AWS Provisionados:

#### EC2 Instance
- **Tipo**: t2.micro (Free Tier)
- **AMI**: Amazon Linux 2023 (`ami-0440d3b780d96b29d`)
- **Região**: us-east-1
- **Storage**: 8GB GP3 (root volume)
- **Key Pair**: Configurável via variável `key_name`

#### Security Group (gremio-app-sg)
- **SSH**: Porta 22 (acesso restrito por IPs configuráveis)
- **HTTP**: Porta 80 (acesso restrito por IPs configuráveis)
- **HTTPS**: Porta 443 (acesso restrito por IPs configuráveis)
- **Aplicação**: Porta 8080 (acesso restrito por IPs configuráveis)
- **Egress**: Todo tráfego de saída liberado

#### Elastic IP
- **Propósito**: IP público fixo para a aplicação
- **Domain**: VPC

### Configuração Automática:
O `user_data` da EC2 instala automaticamente:
- Docker e Docker Compose
- Git
- Configurações de usuário para o ec2-user

### Variáveis Terraform:
- `aws_region`: Região AWS (padrão: us-east-1)
- `instance_type`: Tipo da instância (padrão: t2.micro)
- `ami_id`: ID da AMI (padrão: Amazon Linux 2023)
- `key_name`: Nome do par de chaves SSH
- `ssh_allowed_ips`: IPs permitidos para acesso SSH

### Outputs da Infraestrutura:
- **instance_id**: ID da instância EC2
- **instance_public_ip**: IP público da instância
- **application_url**: URL da aplicação (http://IP:8080)

### Estrutura de Arquivos Terraform:
- `main.tf`: Recursos principais (EC2, Security Group, EIP)
- `variables.tf`: Definição das variáveis
- `outputs.tf`: Outputs da infraestrutura
- `terraform.tfvars`: Configurações específicas (não versionado)

### Segurança:
- Acesso SSH restrito por IP (configurável via `ssh_allowed_ips`)
- Security Group com regras específicas para portas necessárias
- Arquivos sensíveis (.tfvars, .tfstate) no .gitignore
- Chaves SSH gerenciadas via AWS Key Pairs
- Uso de secrets do GitHub Actions para informações sensíveis
- Nginx configurado para aceitar qualquer host (produção)

## 5. Status do Projeto

### ✅ Funcionalidades Implementadas:
- Pipeline CI/CD completo e funcional
- Deploy automatizado via GitHub Actions
- Infraestrutura AWS provisionada via Terraform
- Aplicação containerizada com Docker
- Servidor web Nginx configurado
- Registry de imagens no GitHub Container Registry

### 🔐 Segurança Validada:
- Arquivos sensíveis removidos do controle de versão
- Secrets configurados corretamente no GitHub Actions
- Acesso restrito via Security Groups
- Deploy com verificações de integridade

### 🌐 Acesso à Aplicação:
- **URL**: `http://IP_EC2:8080`
- **Status**: Online e funcional
- **Container**: `gremio-brasileirao-2025-app-1`
- **Imagem**: `ghcr.io/pdelfino0/gremio-brasileiro-2025:latest`

---

*Documentação atualizada e validada em: Junho 2025* 