# **Fluxo de Caixa do Comerciante**

Este é um projeto desenvolvido com Node.js e NestJS para controle do fluxo de caixa de um comerciante, utilizando o Prisma como ORM (Object-Relational Mapping).

![MarineGEO circle logo](/public/desenho_tecnico.png "MarineGEO logo")

## **Funcionalidades**
* Registro de lançamentos diários de débitos e créditos no fluxo de caixa.
* Cálculo automático do saldo consolidado diário.
* Geração de relatório com o saldo consolidado diário.

## **Requisitos**
* Node.js (versão 18.16.0)

## **Instalação**
Clone o repositório do projeto.
```
git clone https://github.com/cirebox/fluxocaixa-nodejs.git
```
Abra o diretório
```
cd fluxocaixa-nodejs
```
Execute o comando para instalar as dependências.
```
npm install
```
Configure o arquivo .env baseado no .env.example

Configure o banco de dados no arquivo .env, fornecendo as informações de conexão.
Execute o comando para aplicar as migrações do banco de dados.
```
npx prisma db push
```
Execute o comando para iniciar o servidor de desenvolvimento.
```
npm run start:dev
```
## **Uso**
1. Acesse a API em http://localhost:3000.
2. Utilize as rotas disponíveis para registrar lançamentos de débitos e créditos no fluxo de caixa.
3. Utilize as rotas para consultar o saldo consolidado diário ou gerar relatórios.

## **Endpoints Disponíveis**
A documentação completa dos endpoints da API, incluindo os métodos suportados e os parâmetros necessários, está disponível na rota /docs/v1 após a execução da aplicação.

## **Estrutura do Projeto**
A estrutura do projeto segue a arquitetura do NestJS, com os seguintes diretórios principais:

* **src:** Contém os arquivos-fonte do projeto.
  * **@types:** Contém todos os types
  * **@common:** Contém arquivos que são compartilhados entre diferentes partes do projeto
  * **@config:** Contém configurações basicas do projeto
  * **@core:**  Contém serviços e classes fundamentais para o funcionamento da aplicação
  * **@modules:** Contém a estrutura modular da aplicação
    *  **controllers:** Controladores responsáveis por lidar com as requisições HTTP.
    *  **services:** Serviços que encapsulam a lógica de negócio.
    *  **dtos:** Objetos de transferência de dados utilizados nas requisições
    *  **tests:** Testes automatizados.
  * **shared:** Contém recursos compartilhados entre diferentes módulos da aplicação
    *  **infra:**
        *  **prisma:**
        *  **repositories:**
    *  **interfaces:**

## **Teste**
```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```