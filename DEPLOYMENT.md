# Configuração de Deployment

Este documento contém instruções para configurar o deployment automatizado usando GitHub Actions para a aplicação Grêmio Brasileirão 2025.

## Pré-requisitos

1. Uma instância EC2 na AWS com Docker e Docker Compose instalados
2. Um usuário IAM com permissões adequadas para acessar a EC2
3. Uma chave SSH para acessar a instância EC2

## Configuração de Secrets no GitHub

Para que o workflow do GitHub Actions funcione corretamente, você precisa configurar os seguintes secrets no seu repositório GitHub:

1. Vá para o seu repositório no GitHub
2. Acesse **Settings > Secrets and variables > Actions**
3. Clique em **New repository secret**
4. Adicione os seguintes secrets:

| Nome do Secret | Descrição | Exemplo |
|---------------|-----------|---------|
| `AWS_ACCESS_KEY_ID` | ID da chave de acesso do usuário IAM | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | Chave de acesso secreta do usuário IAM | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `EC2_HOST` | Endereço IP público ou DNS da instância EC2 | `ec2-12-345-67-89.compute-1.amazonaws.com` |
| `EC2_USERNAME` | Nome de usuário para SSH na EC2 (geralmente ec2-user ou ubuntu) | `ec2-user` |
| `EC2_SSH_KEY` | Chave SSH privada para acessar a instância EC2 | Conteúdo do arquivo de chave privada (`id_rsa`) |

## Configuração da EC2

1. Certifique-se de que o Docker e o Docker Compose estão instalados na EC2:
   ```bash
   sudo yum update -y
   sudo yum install -y docker
   sudo service docker start
   sudo usermod -a -G docker ec2-user
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. Clone o repositório na EC2:
   ```bash
   mkdir -p /home/ec2-user/gremio-brasileirao-2025
   cd /home/ec2-user/gremio-brasileirao-2025
   git clone https://github.com/seu-usuario/gremio-brasileirao-2025.git .
   ```

## Teste Manual do Deployment

Para testar manualmente o deployment:

```bash
cd /home/ec2-user/gremio-brasileirao-2025
git pull
docker-compose down
docker-compose up -d --build
```

## Verificação do Deployment

Após o deployment, você pode verificar se o container está rodando:

```bash
docker ps | grep gremio-brasileirao-2025
```

E acessar a aplicação no navegador usando o endereço IP público da EC2:
```
http://[EC2-IP-PUBLICO]:8080
``` 