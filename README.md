# pagina-login

Projeto de estudo: um sistema simples de **login e cadastro de usuários**, com páginas web, uma API em Java e um banco de dados.

## O que o projeto faz

- Cadastra usuários pelo navegador (e-mail e senha).
- Faz o login conferindo os dados no banco.
- Guarda as senhas **criptografadas** (BCrypt), nunca em texto puro.
- Avisa quando o e-mail já está cadastrado.

## Tecnologias

- **Front-end:** HTML, CSS e JavaScript
- **Back-end:** Java 21, Spring Boot, Spring Web e Spring Data JPA
- **Banco de dados:** MariaDB
- **Segurança:** BCrypt (spring-security-crypto)

## Estrutura do projeto

```
pagina-login/
├── login.html        # página de login
├── cadastro.html     # página de cadastro
├── estilo.css        # estilo das páginas
├── script.js         # envia o login para a API
├── cadastro.js       # envia o cadastro para a API
└── login-api/        # API em Spring Boot
    ├── pom.xml
    └── src/main/java/com/example/login_api/
        ├── LoginApiApplication.java
        ├── Usuario.java
        ├── UsuarioRepository.java
        └── LoginController.java
```

## Como rodar

### 1. Pré-requisitos

- Java 21
- MariaDB instalado e ligado

### 2. Criar o banco de dados

No MariaDB, execute:

```sql
CREATE DATABASE login_db;
```

### 3. Criar o arquivo de configuração

O arquivo `application.properties` **não está no repositório**, porque contém a senha do banco. Crie-o em `login-api/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/login_db
spring.datasource.username=root
spring.datasource.password=SUA_SENHA_AQUI
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Troque `SUA_SENHA_AQUI` pela senha do seu MariaDB.

### 4. Ligar a API

Dentro da pasta `login-api`, execute:

```
.\mvnw spring-boot:run
```

Espere aparecer `Started LoginApiApplication`. A API fica disponível em `http://localhost:8080`.

### 5. Abrir as páginas

Com a API rodando, abra `cadastro.html` ou `login.html` no navegador.

## Endpoints da API

| Método | Endereço    | O que faz                  |
|--------|-------------|----------------------------|
| POST   | `/cadastro` | Cria um usuário novo       |
| POST   | `/login`    | Confere e-mail e senha     |

Os dois recebem um JSON neste formato:

```json
{
  "email": "teste@teste.com",
  "senha": "123456"
}
```

## Ideias para melhorar

- Página de boas-vindas depois do login
- Login com token (JWT) para manter a pessoa conectada
- Restringir o CORS para aceitar só o endereço da página
- Validar o formato do e-mail e a força da senha também na API

## Observação

Este é um projeto de estudo. Antes de usar em produção, seria preciso reforçar a segurança (HTTPS, tokens, limite de tentativas de login e outras proteções).