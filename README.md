# Armazenamento de Arquivos Pessoal - Full Stack

Este projeto consiste em um sistema de gerenciamento de arquivos desenvolvido para consolidar conhecimentos em integração de sistemas, persistência de dados e computação em nuvem. A aplicação utiliza uma arquitetura moderna baseada em containers para permitir o upload, visualização e exclusão de documentos de forma agnóstica ao ambiente.

---

## Demonstração em Nuvem (AWS)
A aplicação está implantada em uma instância **EC2** e pode ser acessada pelo endereço:

> **Acesse aqui:** [http://3.22.172.99:5173](http://3.22.172.99:5173)

---

## Tecnologias Utilizadas

### **Interface do Usuário**
* **React** com TypeScript
* **Tailwind CSS** (Estilização)
* **Axios** (Consumo de API)

### **Servidor de Aplicação**
* **NestJS** (Node.js Framework)
* **TypeORM** (Persistência de dados)
* **Multer** (Processamento de uploads)

### **Infraestrutura e Persistência**
* **PostgreSQL** (Banco de dados relacional)
* **Docker & Docker Compose** (Containerização)
* **AWS** (Hospedagem em ambiente Ubuntu Linux)

---

## Configuração de Ambientes
O projeto foi estruturado para ser executado em diferentes ambientes (**Desenvolvimento Local** ou **Produção na Nuvem**) através de variáveis de ambiente.

### **Separação de Responsabilidades**
1.  **Repositório (GitHub):** Contém o código-fonte genérico e as instruções de orquestração do Docker.
2.  **Ambiente Local/Servidor:** Contém o arquivo `.env`, que define as credenciais e endereços IP específicos daquela máquina.

---

## Instruções para Execução Local

Para testar o projeto em sua máquina local, siga os passos abaixo:

### 1. Clonar o Repositório
```bash
git clone [https://github.com/GabrielJoao19/teste-tecnico-react-nestjs.git](https://github.com/GabrielJoao19/teste-tecnico-react-nestjs.git)
cd teste-tecnico-react-nestjs
```

### 2. Configurar Variáveis de Ambiente
Na raiz do projeto, você encontrará o arquivo .env.example. Crie uma cópia deste arquivo e renomeie para .env:

```Bash
cp .env.example .env
```
Certifique-se de que, para execução local, os endereços de API e Banco de Dados estejam apontando para localhost.

### 3. Inicializar a Aplicação com Docker
Certifique-se de ter o Docker e o Docker Compose instalados e execute:

```Bash
docker-compose up --build
```
Este comando irá:

Instalar as dependências necessárias.

Compilar o código TypeScript.

Criar os volumes para persistência do Banco de Dados e da pasta de Uploads.

Inicializar os serviços nas portas 3000 (API), 5173 (Frontend) e 5432 (PostgreSQL).

### 4. Acessar o Sistema
Interface: http://localhost:5173

API: http://localhost:3000

### Estrutura de Persistência
O sistema utiliza volumes mapeados para garantir que os arquivos enviados e os registros no banco de dados não sejam perdidos ao reiniciar ou remover os containers, mantendo a integridade dos dados no disco rígido da máquina hospedeira.

## Autor
### João Gabriel Silva Gama - Estudante de Análise e Desenvolvimento de Sistemas - IFRN Natal Central.
