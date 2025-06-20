# Segurança e Gerenciamento de Credenciais

## 🔐 Proteção de Credenciais

Este projeto implementa várias camadas de segurança para proteger credenciais sensíveis:

### 1. Variáveis de Ambiente

**NUNCA** commite credenciais diretamente no código. Use variáveis de ambiente:

```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite o arquivo .env com suas credenciais reais
nano .env
```

### 2. Arquivos Protegidos

Os seguintes arquivos são automaticamente ignorados pelo Git:
- `.env*` - Arquivos de variáveis de ambiente
- `*.pem`, `*.key` - Chaves SSH
- `*.tfstate*` - Estados do Terraform
- `.terraform/` - Cache do Terraform

### 3. Configuração Local

Para desenvolvimento local:

```bash
# 1. Crie seu arquivo .env
cp env.example .env

# 2. Configure suas credenciais
POSTGRES_PASSWORD=sua_senha_segura_aqui
DATABASE_URL=postgresql://gremio_user:sua_senha_segura_aqui@postgres:5432/gremio_db

# 3. Execute o projeto
docker-compose up -d
```

### 4. Produção

Para produção, use:
- **AWS Secrets Manager** ou **AWS Systems Manager Parameter Store**
- **Docker Secrets** (em modo swarm)
- **Kubernetes Secrets**

### 5. Rotação de Credenciais

- Troque senhas regularmente
- Use senhas fortes (mínimo 16 caracteres)
- Considere usar autenticação por chave SSH

### 6. Monitoramento

- Monitore logs de acesso
- Configure alertas para tentativas de acesso não autorizado
- Use ferramentas de análise de segurança

## 🚨 Checklist de Segurança

- [ ] Arquivo `.env` criado e configurado
- [ ] Senhas fortes definidas
- [ ] Chaves SSH protegidas (600)
- [ ] Firewall configurado
- [ ] Logs de segurança ativos
- [ ] Backup de dados configurado
- [ ] Atualizações de segurança em dia

## 📞 Suporte

Em caso de comprometimento de credenciais:
1. Rotacione imediatamente todas as senhas
2. Revogue chaves SSH comprometidas
3. Monitore logs para atividades suspeitas
4. Notifique a equipe de segurança 