# Backend OdontoLegal 🦷

## 📋 Sobre o Projeto
O Backend OdontoLegal é uma API RESTful desenvolvida para gerenciar processos odontolegais, oferecendo uma solução robusta e segura para o gerenciamento de laudos, documentos e processos relacionados à odontologia legal.

## 🎯 Objetivos
- Fornecer uma API segura e escalável para gerenciamento de processos odontolegais
- Facilitar o armazenamento e gerenciamento de documentos e laudos
- Implementar autenticação e autorização robustas
- Garantir a integridade e segurança dos dados
- Oferecer uma documentação clara e completa da API

## 📊 Critérios de Avaliação

### Checklist
- [x] Boas práticas
- [x] Banco/ORM
- [x] Design de projeto e rotas
- [x] Boas práticas (HTTP, segurança, código)
- [x] Swagger
- [x] Login/Autorização
- [x] CRUD de Casos
- [x] Gestão de Vítimas
- [x] Evidências com Imagens e Geolocalização
- [x] Laudos e Relatórios
- [x] Dashboard
- [x] Nova entidade vítima
- [ ] Laudos e Relatórios com IA
- [x] Requisitos da primeira parte
- [x] Repositório organizado
- [x] Deploy em nuvem

## 📋 Requisitos do Projeto

### 🎯 Requisitos Funcionais

#### 1. Autenticação e Autorização
- [x] Sistema de login/autorização para aplicação web e mobile
- [x] Diferentes perfis de usuário (mesmos requisitos web/mobile)
- [x] Proteção de rotas baseada em perfis
- [x] Gerenciamento de sessão e tokens JWT

#### 2. Gestão de Casos
- [x] Cadastro completo de casos
- [x] Consulta e listagem de casos
- [x] Atualização de status (Em andamento, Finalizado, Arquivado)
- [x] Associação de casos com vítimas
- [x] Dashboard com visão geral dos casos

#### 3. Gestão de Vítimas
- [x] Cadastro completo de vítimas com:
  - NIC (Número de Identificação do Caso)
  - Nome completo
  - Gênero
  - Idade
  - Documento de identificação
  - Endereço
  - Cor/Etnia
  - Odontograma com anotações
  - Anotações de regiões anatômicas
- [x] Associação de múltiplas vítimas a um caso
- [x] Consulta e atualização de dados das vítimas

#### 4. Gestão de Evidências
- [x] Cadastro de evidências com:
  - Captura de imagens via aplicativo mobile
  - Geolocalização automática
  - Data e hora da coleta
  - Tipo de evidência
  - Status de análise
- [x] Upload e armazenamento de imagens
- [x] Associação de evidências a casos
- [x] Rastreamento de evidências por usuário

#### 5. Laudos e Relatórios
- [x] Geração de laudos de evidências
- [x] Geração de relatórios de casos
- [x] Integração com IA para análise
- [x] Exportação de documentos
- [x] Histórico de laudos e relatórios

#### 6. Dashboard e Banco de Dados
- [x] Visualização de estatísticas
- [x] Banco de dados odonto-legal
- [x] Filtros e buscas avançadas
- [x] Relatórios gerenciais

### 🛡️ Requisitos Não Funcionais

#### 1. Segurança
- [x] Criptografia de dados sensíveis
- [x] Proteção contra ataques comuns (XSS, CSRF, etc.)
- [x] Validação de dados
- [x] Sanitização de inputs
- [x] Logs de auditoria
- [x] Políticas de senha seguras

#### 2. Performance
- [x] Tempo de resposta otimizado
- [x] Cache de dados frequentes
- [x] Otimização de consultas ao banco
- [ ] Compressão de imagens
- [ ] Paginação de resultados

#### 3. Escalabilidade
- [x] Arquitetura modular
- [x] Separação de responsabilidades
- [x] Preparado para aumento de carga
- [x] Estrutura de microserviços

#### 4. Usabilidade
- [x] Interface responsiva (web)
- [x] Aplicativo mobile (React Native)
- [x] Design intuitivo (UI/UX)
- [x] Feedback visual de ações
- [x] Acessibilidade

#### 5. Documentação
- [x] API documentada com Swagger
- [x] README completo
- [x] Documentação de código
- [x] Guias de uso
- [x] Documentação de deploy

#### 6. Infraestrutura
- [x] Deploy em ambiente cloud
- [x] Backup automático
- [x] Monitoramento
- [x] CI/CD
- [x] Ambiente de desenvolvimento

#### 7. Integração
- [x] APIs RESTful
- [x] Integração com serviços de IA
- [x] Integração com serviços de armazenamento
- [x] Webhooks para notificações

#### 8. Manutenibilidade
- [x] Código limpo e organizado
- [x] Padrões de projeto
- [x] Testes automatizados
- [x] Versionamento (Git)
- [x] Code review

## 🛠️ Tecnologias Utilizadas
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT para autenticação
- Cloudinary para armazenamento de imagens
- Swagger para documentação da API
- Outras dependências importantes:
  - bcryptjs (criptografia)
  - helmet (segurança)
  - cors (controle de acesso)
  - multer (upload de arquivos)
  - morgan (logging)

## 📁 Estrutura do Projeto
```
backend-pi/
├── app.js              # Arquivo principal da aplicação
├── router/            # Rotas da API
├── controllers/       # Controladores da aplicação
├── models/           # Modelos do MongoDB
├── middlewares/      # Middlewares personalizados
├── services/         # Serviços e lógica de negócio
├── utils/            # Funções utilitárias
├── docs/             # Documentação adicional
└── node_modules/     # Dependências
```

## 📊 Estrutura dos Models

O sistema utiliza MongoDB como banco de dados, com os seguintes models:

### 👤 User (Usuário)
```javascript
{
    username: String,      // Nome de usuário (único)
    email: String,         // Email (único)
    password: String,      // Senha (criptografada)
    casos: [ObjectId],     // Referência aos casos
    relatorios: [ObjectId], // Referência aos relatórios
    evidencias: [ObjectId]  // Referência às evidências
}
```
- Implementa criptografia automática de senha
- Possui método para comparação de senhas
- Mantém timestamps de criação/atualização

### 📋 Caso
```javascript
{
    titulo: String,        // Título do caso
    descricao: String,     // Descrição detalhada
    status: String,        // Em andamento, Finalizado, Arquivado
    dataAbertura: Date,    // Data de abertura
    dataFechamento: Date,  // Data de fechamento (opcional)
    evidencias: [ObjectId], // Referência às evidências
    relatorios: [ObjectId], // Referência aos relatórios
    vitimas: [ObjectId]     // Referência às vítimas
}
```

### 👥 Vitima
```javascript
{
    nic: String,           // Número de Identificação do Caso
    nome: String,          // Nome completo
    genero: String,        // Gênero
    idade: Number,         // Idade
    documento: String,     // Documento de identificação (único)
    endereco: String,      // Endereço
    corEtnia: String,      // Cor/Etnia
    odontograma: [ObjectId] // Referência aos odontogramas
}
```

### 🦷 Odontograma
```javascript
{
    identificacao: Number,  // Identificação do dente
    observacao: String     // Observações sobre o dente
}
```

### 🔍 Evidência
```javascript
{
    tipo: String,          // Tipo da evidência
    dataColeta: Date,      // Data da coleta
    status: String,        // Em análise, Concluído
    coletadaPor: ObjectId, // Referência ao usuário
    geolocalizacao: {      // Localização da coleta
        latitude: String,
        longitude: String
    },
    imagens: [ObjectId],   // Referência às imagens
    textos: [ObjectId],    // Referência aos textos
    laudo: ObjectId        // Referência ao laudo
}
```

### 📸 ImagemEvidencia
```javascript
{
    imagemUrl: String      // URL da imagem armazenada
}
```

### 📝 TextoEvidencia
```javascript
{
    conteudo: String       // Conteúdo textual da evidência
}
```
- Mantém timestamps de criação/atualização

### 📄 Laudo
```javascript
{
    descricao: String,     // Descrição detalhada
    conclusao: String,     // Conclusão do laudo
    peritoResponsavel: ObjectId, // Referência ao usuário perito
    dataCriacao: Date      // Data de criação do laudo
}
```

### 📊 Relatorio
```javascript
{
    titulo: String,        // Título do relatório
    conteudo: String,      // Conteúdo do relatório
    peritoResponsavel: ObjectId, // Referência ao usuário perito
    dataCriacao: Date      // Data de criação do relatório
}
```
- Mantém timestamps de criação/atualização

### 🔄 Relacionamentos entre Models

1. **User (Usuário)**
   - Pode ter múltiplos Casos
   - Pode ter múltiplos Relatórios
   - Pode ter múltiplas Evidências
   - Pode ser perito responsável por Laudos e Relatórios

2. **Caso**
   - Pertence a um Usuário
   - Pode ter múltiplas Evidências
   - Pode ter múltiplos Relatórios
   - Pode ter múltiplas Vítimas

3. **Vitima**
   - Pertence a um Caso
   - Pode ter múltiplos Odontogramas

4. **Evidência**
   - Pertence a um Caso
   - Coletada por um Usuário
   - Pode ter múltiplas Imagens
   - Pode ter múltiplos Textos
   - Pode ter um Laudo

5. **Laudo**
   - Pertence a uma Evidência
   - Criado por um Usuário (perito)

6. **Relatorio**
   - Pertence a um Caso
   - Criado por um Usuário (perito)

### 📌 Características Importantes
- Todos os models implementam timestamps (createdAt, updatedAt) quando relevante
- Utiliza referências (ObjectId) para relacionamentos
- Implementa validações de campos obrigatórios
- Utiliza enums para campos com valores predefinidos
- Mantém a integridade referencial através de refs
- Documentos únicos são marcados com `unique: true`
- Campos opcionais são marcados com `required: false`

## 🚀 Como Instalar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB
- NPM ou Yarn
- Conta no Cloudinary (para upload de imagens)

### Passos para Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd backend-pi
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=3000
MONGODB_URI=sua_uri_do_mongodb
JWT_SECRET=seu_jwt_secret
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

4. Inicie o servidor:
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

## 📚 Documentação da API
A documentação completa da API está disponível através do Swagger UI quando o servidor estiver rodando:
```
http://localhost:3000/api-docs
```

## 🤝 Contribuição
1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença ISC.

## 📞 Suporte
Para suporte, envie um email para [nossa equipe](lucas.desenvolvedor.js@gmail.com) ou abra uma issue no repositório.

