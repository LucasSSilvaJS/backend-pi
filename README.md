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
- [x] Políticas de senha seguras

#### 2. Performance
- [x] Tempo de resposta otimizado
- [x] Otimização de consultas ao banco

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
- [x] Monitoramento
- [x] CI/CD
- [x] Ambiente de desenvolvimento

#### 7. Integração
- [x] APIs RESTful
- [x] Integração com serviços de IA
- [x] Integração com serviços de armazenamento

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
    password: String,      // Senha (criptografada, não retornada em queries)
    cargo: String,         // Enum: ['admin', 'perito', 'assistente']
    status: String,        // Enum: ['ativo', 'inativo']
    fotoPerfil: String,    // URL da foto (opcional)
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
    status: String,        // Enum: ['Em andamento', 'Finalizado', 'Arquivado']
    dataAbertura: Date,    // Data de abertura (automática)
    dataFechamento: Date,  // Data de fechamento (opcional)
    geolocalizacao: {      // Localização do caso
        latitude: String,
        longitude: String
    },
    evidencias: [ObjectId], // Referência às evidências
    relatorio: ObjectId,    // Referência ao relatório (um por caso)
    vitimas: [ObjectId]     // Referência às vítimas (obrigatório)
}
```
- Mantém timestamps de criação/atualização

### 👥 Vitima
```javascript
{
    nic: String,           // Número de Identificação do Caso (8 dígitos, único, imutável)
    nome: String,          // Nome completo (opcional)
    genero: String,        // Gênero (opcional)
    idade: Number,         // Idade (opcional)
    documento: String,     // Documento de identificação (único, opcional)
    endereco: String,      // Endereço (opcional)
    corEtnia: String,      // Cor/Etnia (opcional)
    odontograma: [ObjectId] // Referência aos odontogramas (opcional)
}
```
- Validação de formato do NIC (8 dígitos)
- NIC é imutável após criação

### 🦷 Odontograma
```javascript
{
    identificacao: Number,  // Identificação do dente (obrigatório)
    observacao: String     // Observações sobre o dente (obrigatório)
}
```

### 🔍 Evidência
```javascript
{
    tipo: String,          // Tipo da evidência (obrigatório)
    dataColeta: Date,      // Data da coleta (obrigatório)
    status: String,        // Enum: ['Em análise', 'Concluído']
    coletadaPor: ObjectId, // Referência ao usuário (obrigatório)
    geolocalizacao: {      // Localização da coleta (obrigatório)
        latitude: String,
        longitude: String
    },
    imagens: [ObjectId],   // Referência às imagens (obrigatório)
    textos: [ObjectId],    // Referência aos textos (obrigatório)
    laudo: ObjectId        // Referência ao laudo (opcional)
}
```
- Mantém timestamps de criação/atualização

### 📸 ImagemEvidencia
```javascript
{
    imagemUrl: String      // URL da imagem armazenada (obrigatório)
}
```

### 📝 TextoEvidencia
```javascript
{
    conteudo: String       // Conteúdo textual da evidência (obrigatório)
}
```
- Mantém timestamps de criação/atualização

### 📄 Laudo
```javascript
{
    descricao: String,     // Descrição detalhada (obrigatório)
    conclusao: String,     // Conclusão do laudo (obrigatório)
    peritoResponsavel: ObjectId, // Referência ao usuário perito (obrigatório)
    dataCriacao: Date      // Data de criação do laudo (automática)
}
```

### 📊 Relatorio
```javascript
{
    titulo: String,        // Título do relatório (obrigatório)
    conteudo: String,      // Conteúdo do relatório (gerado por LLM, obrigatório)
    peritoResponsavel: ObjectId, // Referência ao usuário perito (obrigatório)
    dataCriacao: Date      // Data de criação do relatório (automática)
}
```
- Mantém timestamps de criação/atualização

### 🔄 Relacionamentos entre Models

1. **User (Usuário)**
   - Pode ter múltiplos Casos
   - Pode ter múltiplos Relatórios
   - Pode ter múltiplas Evidências
   - Pode ser perito responsável por Laudos e Relatórios
   - Possui cargo específico (admin, perito, assistente)
   - Possui status (ativo, inativo)

2. **Caso**
   - Deve ter pelo menos uma Vítima
   - Pode ter múltiplas Evidências
   - Possui um único Relatório
   - Possui geolocalização
   - Possui status específico (Em andamento, Finalizado, Arquivado)

3. **Vitima**
   - Possui NIC único e imutável
   - Pode ter múltiplos Odontogramas
   - Possui campos opcionais para informações pessoais

4. **Evidência**
   - Deve ter pelo menos uma Imagem
   - Deve ter pelo menos um Texto
   - Coletada por um Usuário específico
   - Possui geolocalização obrigatória
   - Pode ter um Laudo associado
   - Possui status específico (Em análise, Concluído)

5. **Laudo**
   - Pertence a uma Evidência
   - Criado por um Usuário perito
   - Possui data de criação automática

6. **Relatorio**
   - Pertence a um Caso
   - Criado por um Usuário perito
   - Conteúdo gerado por LLM
   - Possui data de criação automática

### 📌 Características Importantes
- Todos os models implementam timestamps (createdAt, updatedAt) quando relevante
- Utiliza referências (ObjectId) para relacionamentos
- Implementa validações de campos obrigatórios
- Utiliza enums para campos com valores predefinidos
- Mantém a integridade referencial através de refs
- Documentos únicos são marcados com `unique: true`
- Campos opcionais são marcados com `required: false`
- Implementa validações específicas (ex: formato do NIC)
- Utiliza campos imutáveis quando necessário
- Integração com LLM para geração de relatórios

## 🔄 Fluxo de Inserção de Dados

O sistema segue uma hierarquia específica para inserção de dados, garantindo a integridade e consistência das informações. Abaixo está o fluxo detalhado:

### 1. Usuário (👤)
- **Pré-requisito**: Nenhum
- **Campos Obrigatórios**: username, email, password, cargo
- **Observações**: 
  - O cargo determina as permissões do usuário
  - A senha é automaticamente criptografada
  - O status padrão é 'ativo'

### 2. Caso (📋)
- **Pré-requisito**: Usuário criado
- **Campos Obrigatórios**: titulo, descricao, vitimas
- **Fluxo**:
  1. Criar o caso com informações básicas
  2. Associar pelo menos uma vítima
  3. O status inicial é 'Em andamento'
  4. A data de abertura é automática

### 3. Vítima (👥)
- **Pré-requisito**: Caso criado
- **Campos Obrigatórios**: nic (8 dígitos)
- **Campos Opcionais**: nome, genero, idade, documento, endereco, corEtnia
- **Fluxo**:
  1. Gerar NIC único (8 dígitos)
  2. Preencher informações básicas
  3. Associar ao caso
  4. O NIC não pode ser alterado após a criação

### 4. Evidência (🔍)
- **Pré-requisito**: Caso e Usuário criados
- **Campos Obrigatórios**: tipo, dataColeta, coletadaPor, geolocalizacao, imagens, textos
- **Fluxo**:
  1. Registrar tipo e data da evidência
  2. Incluir geolocalização
  3. Associar usuário que coletou
  4. Adicionar pelo menos uma imagem
  5. Adicionar pelo menos um texto
  6. Status inicial é 'Em análise'

### 5. Imagem da Evidência (📸)
- **Pré-requisito**: Evidência criada
- **Campos Obrigatórios**: imagemUrl
- **Fluxo**:
  1. Upload da imagem
  2. Geração da URL
  3. Associação à evidência

### 6. Texto da Evidência (📝)
- **Pré-requisito**: Evidência criada
- **Campos Obrigatórios**: conteudo
- **Fluxo**:
  1. Inserir conteúdo textual
  2. Associação à evidência

### 7. Odontograma (🦷)
- **Pré-requisito**: Vítima criada
- **Campos Obrigatórios**: identificacao, observacao
- **Fluxo**:
  1. Registrar identificação do dente
  2. Adicionar observações
  3. Associar à vítima

### 8. Laudo (📄)
- **Pré-requisito**: Evidência criada e Usuário perito
- **Campos Obrigatórios**: descricao, conclusao, peritoResponsavel
- **Fluxo**:
  1. Criar laudo com descrição e conclusão
  2. Associar perito responsável
  3. Vincular à evidência
  4. Data de criação é automática

### 9. Relatório (📊)
- **Pré-requisito**: Caso criado e Usuário perito
- **Campos Obrigatórios**: titulo, conteudo, peritoResponsavel
- **Fluxo**:
  1. Criar relatório com título
  2. Gerar conteúdo via LLM
  3. Associar perito responsável
  4. Vincular ao caso
  5. Data de criação é automática

### 📌 Observações Importantes
- A ordem de inserção deve ser respeitada para manter a integridade dos dados
- Cada nível depende da existência do nível anterior
- Relacionamentos são mantidos através de referências (ObjectId)
- Campos obrigatórios devem ser preenchidos em cada nível
- Alguns campos são preenchidos automaticamente pelo sistema
- Validações específicas são aplicadas em cada nível
- Permissões de usuário são verificadas em cada operação

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
# Configurações do Servidor
PORT=3000                    # Porta onde o servidor irá rodar
DISABLE_AUTH=false          # Desabilita autenticação (apenas para desenvolvimento)

# Configurações do MongoDB
DATABASE_URL=mongodb://...   # URL de conexão com o MongoDB

# Configurações de Segurança
JWT_SECRET=seu_jwt_secret    # Chave secreta para geração de tokens JWT

# Configurações do Cloudinary (Armazenamento de Imagens)
CLOUD_NAME=seu_cloud_name    # Nome da sua conta no Cloudinary
API_KEY=sua_api_key         # Chave de API do Cloudinary
API_SECRET=seu_api_secret   # Chave secreta do Cloudinary

# Configurações da IA (Google Gemini)
GEMINI_API_KEY=sua_chave    # Chave de API do Google Gemini para geração de relatórios
```

### 📌 Observações sobre as Variáveis de Ambiente

#### Configurações do Servidor
- `PORT`: Define a porta onde o servidor irá rodar (padrão: 3000)
- `DISABLE_AUTH`: Quando true, desabilita a autenticação (use apenas em desenvolvimento)

#### Configurações do MongoDB
- `DATABASE_URL`: URL completa de conexão com o MongoDB
  - Formato: `mongodb://[username:password@]host[:port]/database`
  - Exemplo: `mongodb://localhost:27017/odontolegal`

#### Configurações de Segurança
- `JWT_SECRET`: Chave secreta para assinatura dos tokens JWT
  - Deve ser uma string complexa e segura
  - Mantenha em segredo em produção

#### Configurações do Cloudinary
- `CLOUD_NAME`: Nome da sua conta no Cloudinary
- `API_KEY`: Chave de API do Cloudinary
- `API_SECRET`: Chave secreta do Cloudinary
  - Necessário para upload e gerenciamento de imagens
  - Obtenha estas credenciais no dashboard do Cloudinary

#### Configurações da IA
- `GEMINI_API_KEY`: Chave de API do Google Gemini
  - Utilizada para geração automática de relatórios
  - Obtenha a chave no Google Cloud Console

### ⚠️ Importante
- Nunca compartilhe ou comite o arquivo `.env` no repositório
- Mantenha diferentes arquivos `.env` para desenvolvimento e produção
- Use valores diferentes para `JWT_SECRET` em cada ambiente
- Em produção, use sempre `DISABLE_AUTH=false`
- Mantenha as chaves de API em segredo
- Faça backup das credenciais em local seguro

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
https://backend-pi-26cz.onrender.com/api-docs
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

