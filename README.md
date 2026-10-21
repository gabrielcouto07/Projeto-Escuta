<div align="center">

# Escuta · Ouvidoria Digital Anônima

Uma plataforma de ouvidoria digital que permite relatar, de forma anônima, situações de **bullying**, **assédio**, **discriminação** e outras irregularidades em escolas e faculdades.

</div>

---

O **Escuta** conecta quem precisa denunciar à instituição responsável, permitindo acompanhar o andamento do relato por meio de um **código secreto**, sem a necessidade de criar uma conta ou informar sua identidade.

Além do canal de denúncias, a plataforma oferece um **painel de gestão** para a ouvidoria e uma **página pública de transparência**, incentivando a prestação de contas e a melhoria contínua da instituição.

### ODS 16 — Paz, Justiça e Instituições Eficazes

Contribuição para as metas **16.1**, **16.6** e **16.10** da Agenda 2030 da ONU.

> Projeto acadêmico A3 · Usabilidade, Desenvolvimento Web, Mobile e Jogos

---

## Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias)
- [Como executar localmente](#-como-executar-localmente)
- [Publicação em produção](#-publicação-em-produção)
- [Testes](#-testes)
- [Privacidade e segurança](#-privacidade-e-segurança)
- [Melhorias implementadas](#-melhorias-implementadas)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Rotas da aplicação](#️-rotas-da-aplicação)
- [Objetivo do projeto](#-objetivo-do-projeto)

---

## Funcionalidades

### Para quem denuncia

- **Denúncia anônima:** registro de ocorrências sem cadastro ou identificação pessoal.
- **Acompanhamento por código secreto:** consulta ao status e ao histórico da denúncia.
- **Conversa com a ouvidoria:** comunicação vinculada ao protocolo.
- **Atualizações em tempo real:** acompanhamento das mudanças sem precisar recarregar a página.
- **Detector de dados pessoais:** identificação de possíveis informações pessoais digitadas no relato.
- **Saída rápida:** recurso para trocar de página imediatamente em situações desconfortáveis.

### Para a ouvidoria

- **Painel de gestão:** visualização e organização das denúncias recebidas.
- **Gestão de status e encaminhamentos:** acompanhamento das etapas de atendimento.
- **Controle de prazos:** gerenciamento de prorrogações e justificativas.
- **Estatísticas:** visualização de indicadores sobre as ocorrências.
- **Avisos de novas mensagens:** sinalização de interações dos denunciantes.
- **Transparência institucional:** publicação de informações sobre mudanças e melhorias realizadas.

### Para o público

- Página explicativa com perguntas frequentes e informações legais.
- Painel público de transparência.
- Indicadores apresentados com cuidados para reduzir o risco de identificação indireta.
- Recursos de acessibilidade e navegação por teclado.

---

## Tecnologias

| Tecnologia | Finalidade |
| --- | --- |
| React 19 | Interface da aplicação |
| Vite | Desenvolvimento e build |
| React Router | Navegação entre páginas |
| Firebase Authentication | Autenticação da ouvidoria |
| Cloud Firestore | Armazenamento e atualização dos dados |
| Firestore Security Rules | Controle de acesso e validação dos dados |
| Firebase App Check | Proteção adicional contra acessos automatizados |
| Firebase Hosting | Publicação da aplicação |
| Vitest | Testes automatizados |
| Firebase Emulator Suite | Desenvolvimento e testes locais |

---

## Como executar localmente

É possível executar e testar o projeto **sem utilizar um projeto real do Firebase**, por meio dos emuladores locais.

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- [Java](https://adoptium.net/) 21 ou superior
- npm

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie o arquivo local a partir do exemplo:

```bash
cp .env.example .env.local
```

No arquivo `.env.local`, configure:

```env
VITE_USE_EMULATORS=true
```

Mantenha as demais variáveis necessárias conforme o arquivo `.env.example`.

### 3. Inicie os emuladores do Firebase

Em um primeiro terminal, execute:

```bash
npm run emuladores
```

A interface de gerenciamento dos emuladores estará disponível em: **http://localhost:4000**

### 4. Carregue os dados de demonstração

Em um segundo terminal:

```bash
npm run seed
```

O script cria aproximadamente **100 denúncias fictícias** para facilitar os testes e as demonstrações.

Ao final, o terminal informa um código de exemplo para testar o acompanhamento de denúncias e as credenciais de demonstração da ouvidoria:

| Campo | Valor |
| --- | --- |
| E-mail | `ouvidoria@escuta.dev` |
| Senha | `escuta123` |

### 5. Inicie a aplicação

```bash
npm run dev
```

A aplicação ficará disponível em: **http://localhost:5173**
---

## Publicação em produção

Para publicar o Escuta, configure um projeto real no Firebase.

### 1. Crie o projeto Firebase

Acesse o [Firebase Console](https://console.firebase.google.com/), crie um projeto e registre uma aplicação Web.

Configure no `.env.local` as variáveis disponibilizadas pelo Firebase e desative o uso dos emuladores:

```env
VITE_USE_EMULATORS=false
```

### 2. Configure a autenticação

No **Firebase Authentication**:

1. Ative o provedor de autenticação por e-mail e senha.
2. Crie o usuário responsável pela ouvidoria.
3. Copie o **UID** desse usuário para a próxima etapa.

### 3. Configure o Firestore

Crie o banco de dados do **Cloud Firestore**, sem utilizar o modo de teste.

Em seguida, crie manualmente o documento `ouvidores/{UID}`, substituindo `{UID}` pelo UID do usuário criado anteriormente. O documento deve conter:

```json
{
  "nome": "Ouvidoria"
}
```

### 4. Publique as regras e a aplicação

```bash
npx firebase-tools login
npx firebase-tools use --add
npm run deploy
```

Durante a configuração, selecione o projeto Firebase correto.

O comando de deploy executa o processo de build e publica a aplicação e as regras do Firestore, conforme a configuração do projeto.

### 5. Configure o App Check

Para habilitar a proteção adicional:

1. Registre a aplicação no **Firebase App Check** com reCAPTCHA v3.
2. Configure a chave pública em `VITE_RECAPTCHA_SITE_KEY`.
3. Publique a aplicação novamente.
4. Teste os fluxos de envio, acompanhamento e atendimento.
5. Após validar o funcionamento, habilite o **enforcement** para o Firestore no console do Firebase.

### Dados de demonstração em produção

Opcionalmente, é possível carregar dados de exemplo em um projeto real:

```bash
GOOGLE_APPLICATION_CREDENTIALS=chave.json node scripts/seed.mjs --real <projectId>
```
---

## Testes

O projeto possui testes unitários e testes de integração das regras de segurança.

### Testes unitários

```bash
npm test
```

Validam funcionalidades como:

- Geração e validação de códigos secretos.
- Detecção de possíveis dados pessoais.
- Cálculo de estatísticas.

### Testes das regras do Firestore

```bash
npm run test:regras
```

Esse conjunto utiliza os emuladores do Firebase e requer Java instalado. Os testes verificam cenários como:

- Usuários não autenticados não podem listar denúncias.
- O acesso a uma denúncia é controlado pelo código secreto.
- Protocolos não podem ser forjados.
- Campos não permitidos, como IP e nome do denunciante, são rejeitados.
- Usuários sem permissão não podem alterar o status.
- A identidade da ouvidoria não pode ser falsificada em mensagens.
- O histórico não pode ser reescrito.
- A prorrogação de prazo não pode ser realizada mais de uma vez.

O conjunto contempla **35 testes automatizados**, incluindo cenários de acesso indevido e integridade dos registros.

---

## Privacidade e segurança

A privacidade é um dos princípios centrais do Escuta. A aplicação foi projetada para permitir o envio e o acompanhamento de denúncias **sem exigir a identificação do denunciante**.

### Código secreto

O navegador gera um código utilizando `crypto.getRandomValues`, com **16 caracteres** e aproximadamente **79 bits de entropia**. Esse código funciona como identificador da denúncia.

O acesso é controlado pelas regras do Firestore: a consulta individual é permitida conforme as regras implementadas, enquanto a listagem de denúncias é restrita à ouvidoria autorizada.

### Minimização de dados

- Não existe uma coleção dedicada ao cadastro de denunciantes.
- A denúncia aceita uma lista restrita de campos.
- As regras do Firestore rejeitam campos adicionais não permitidos.
- O sistema não foi projetado para armazenar IP ou e-mail do denunciante no documento da denúncia.

### Proteção do código

- O código não é colocado na URL.
- A navegação entre telas utiliza o estado do React Router.
- O estado que contém o código é removido do histórico de navegação ao abrir a tela correspondente.
- O código não é persistido no `localStorage`.

### Armazenamento e sessão

- O cache do Firestore é configurado para funcionar somente em memória.
- A área restrita da ouvidoria é carregada separadamente da experiência pública.
- A sessão da ouvidoria é limitada por aba, com saída após **30 minutos de inatividade**, conforme a implementação do projeto.

### Outras medidas

- Fontes hospedadas pelo próprio site, sem dependência do Google Fonts.
- Política `Referrer-Policy: no-referrer`.
- Ausência de ferramentas de analytics.
- Regras de segurança que validam campos, categorias, estados e operações permitidas.
---

## Melhorias implementadas

Além da proposta original, o projeto incorpora melhorias voltadas à segurança, usabilidade, acessibilidade e transparência.

| Melhoria | Benefício |
| --- | --- |
| Saída rápida | Permite trocar de página rapidamente em situações desconfortáveis |
| Detector de dados pessoais | Alerta sobre e-mails, telefones, CPF, RA e expressões como “meu nome é” |
| Regras de segurança reforçadas | Valida protocolos, campos, categorias, histórico e permissões |
| Prorrogação de prazo | Permite uma prorrogação de até 30 dias, com justificativa, conforme a regra implementada para a Lei 13.460/2017 |
| Aviso de nova mensagem | Permite que o denunciante habilite um aviso para a ouvidoria |
| Atualizações em tempo real | Atualiza o status e a conversa sem recarregar a página |
| Código oculto durante a digitação | Reduz a exposição visual do código secreto |
| Proteção de estatísticas | Agrupa categorias com poucos registros para reduzir riscos de identificação indireta |
| Atualização eficiente de indicadores | Evita regravar estatísticas quando os valores não mudam |
| Sessão por aba | Ajuda a proteger o acesso à ouvidoria em computadores compartilhados |
| Página “Como funciona” | Explica o processo, responde a dúvidas e apresenta informações legais |
| Seção “O que mudou” | Dá visibilidade às melhorias realizadas pela instituição |
| Acessibilidade | Inclui navegação por teclado, gerenciamento de foco, `aria-live`, alternativas textuais para gráficos, contraste adequado, alvos de 44 px e suporte a `prefers-reduced-motion` |
| Emuladores e dados fictícios | Permitem desenvolver e demonstrar o sistema sem depender de um ambiente de produção |

---

## Estrutura do projeto

```text
src/
├── config.js                # Configuração da instituição
├── constantes.js            # Categorias, status, setores e prazos
├── firebase.js              # Firestore, App Check e emuladores
├── firebaseAuth.js          # Autenticação da ouvidoria
├── utils/                   # Segurança, datas, estatísticas e dados pessoais
├── services/                # Acesso ao Firestore e transparência
├── hooks/                   # Hooks de estado, sessão e preferências
├── components/              # Componentes reutilizáveis da interface
└── pages/
    ├── Inicio
    ├── ComoFunciona
    ├── NovaDenuncia
    ├── DenunciaEnviada
    ├── Acompanhar
    ├── Transparencia
    └── ouvidoria/
        ├── Login
        ├── Painel
        ├── Detalhe
        └── Mudancas

firestore.rules              # Regras de segurança do Firestore
scripts/
└── seed.mjs                 # Dados fictícios para demonstração
tests/
├── unidade/                 # Testes unitários
└── regras/                  # Testes das regras de segurança
```

A estrutura separa a interface, a lógica de negócio, os serviços de acesso aos dados e as regras de segurança, facilitando a manutenção e os testes.

---

## Rotas da aplicação

| Rota | Página | Acesso |
| --- | --- | --- |
| `/` | Início | Público |
| `/como-funciona` | Como funciona | Público |
| `/denunciar` | Nova denúncia | Público e anônimo |
| `/denuncia/enviada` | Comprovante de envio | Fluxo de envio |
| `/acompanhar` | Acompanhar denúncia | Quem possui o código |
| `/transparencia` | Transparência | Público |
| `/ouvidoria/login` | Login | Equipe |
| `/ouvidoria` | Fila de denúncias | Ouvidores autorizados |
| `/ouvidoria/denuncias/:protocolo` | Detalhes da denúncia | Ouvidores autorizados |
| `/ouvidoria/mudancas` | Gestão de mudanças | Ouvidores autorizados |

---

## Objetivo do projeto

O **Escuta** busca tornar o relato de situações de violência e irregularidades mais acessível, oferecendo um canal de comunicação com foco na **privacidade**, no **acompanhamento das ocorrências** e na **transparência institucional**.

Mais do que receber denúncias, a proposta é incentivar respostas responsáveis e transformar os relatos em oportunidades de melhoria no ambiente educacional.

---

<div align="center">

<sub><i>Escuta e Faculdade Exemplo são nomes provisórios utilizados no projeto.</i></sub>

</div>
