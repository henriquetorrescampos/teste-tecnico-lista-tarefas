# Sistema de Lista de Tarefas

## Descrição

Sistema de Lista de Tarefas, aplicação web que permite o cadastro, visualização, edição, exclusão e reordenação de tarefas.

## Tecnologias Utilizadas

- **Front-End**: React.js
- **Back-End**: Node.js
- **Banco de Dados**: MongoDB

## Funcionalidades Principais

### 1. Lista de Tarefas

- **Exibição**: Exibe todas as tarefas cadastradas.
- **Destaque Visual**: Tarefas com custo maior ou igual a R$1.000,00 são apresentadas com uma linha de fundo amarelo.
- **Ações Disponíveis**:
  - **Editar**: Permite a edição de tarefas diretamente na tela.
  - **Excluir**: Exclui uma tarefa após a confirmação do usuário.
  - **Incluir**: Adiciona uma nova tarefa ao final da lista.

### 2. Excluir Tarefa

- **Confirmação**: Uma mensagem de confirmação é exibida antes de a tarefa ser excluída.

### 3. Editar Tarefa

- **Campos Editáveis**: Nome da tarefa, custo e data limite.
- **Validação**: Não permite editar uma tarefa se o novo nome já existir na base de dados.
- **Implementação**: A edição é feita direto na tela principal onde os campos são habilitados para edição:

### 4. Incluir Tarefa

- **Campos Preenchidos pelo Usuário**: Nome da tarefa, custo e data limite.
- **Validação**: Não permite a inclusão de tarefas com nomes duplicados.
- **Ordem de Apresentação**: A nova tarefa é adicionada ao final da lista.

### 5. Reordenação de Tarefas

- **Botões de Subir/Descer**: Cada tarefa possui botões para alterar sua posição na lista.

## Estrutura da Base de Dados

### Tabela: Tarefas

| Campo                   | Tipo                    | Descrição                                             |
| ----------------------- | ----------------------- | ----------------------------------------------------- |
| Identificador da tarefa | String (Chave Primária) | Identificador único da tarefa.                        |
| Nome da tarefa          | String                  | Nome descritivo da tarefa.                            |
| Custo (R$)              | Number                  | Custo associado à tarefa.                             |
| Data limite             | Date                    | Data limite para conclusão da tarefa.                 |
| Ordem de apresentação   | Number                  | Número que determina a posição da tarefa na listagem. |

## Pré-requisitos para Execução

- **Node.js** (versão LTS recomendada)
- **MongoDB** (local ou remoto)
- **npm**

## Instalação e Execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/sistema-lista-tarefas.git
   cd sistema-lista-tarefas
   ```
2. **Instale as dependências do back-end:**
   ```bash
   cd server
   npm install
   ```
3. **Instale as dependências do front-end:**
   ```bash
   cd client
   npm install
   ```
