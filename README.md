![GitHub repo size](https://img.shields.io/github/repo-size/patricioemarin/desafio-cep)
![GitHub language count](https://img.shields.io/github/languages/count/patricioemarin/desafio-cep)

# Projeto Desafio Técnico LuizaLabs: API Rest em Node JS - CEP

## Descrição do Projeto

##### A API tem como objetivo principal a consulta de endereço por CEP. A API disponibiliza também um CRUD de usuários para autenticação e proteção de algumas rotas. As rotas protegidas por autenticação são: (A) Exclusão de usuário; (B) Cadastro de CEP; (C) Exclusão de CEP. As rotas de cadastro de usuário e consulta de CEP ficaram propositalmente livres de autenticação. 

### Rotas

- [POST] http://localhost:3000/usuario <br>Cadastro de usuários para acesso à rotas protegidas por autenticação
- [POST] http://localhost:3000/usuario/login <br>Autenticação de usuário (Acesso ao Token)
- [DELETE] http://localhost:3000/usuario/ <br>Exclusão de usuário (usar Token para ser autorizado)
- [POST] http://localhost:3000/cep <br>Cadastro de CEP (endereço [usar Token para ser autorizado])
- [GET] http://localhost:3000/cep/{cep} <br>Consulta de CEP (endereço)
- [DELETE] http://localhost:3000/cep <br>Exclusão de CEP (enredeço [usar Token para ser autorizado])

### Swagger

- http://localhost:3000/api-docs/ <br>'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxx' 

### Resultados esperados (Especificação do desafio técnico)

- API para responder à requisição de consulta de CEP para preenchimento automático de endereço no front:
    - Se CEP válido: resposta com o endereço correspondente.
    - Se CEP válido mas com endereço inexistente: substituição dos dígitos da direita para esquerda por zero (1 por vez) para novas tentativas, até o endereço ser localizado ou se esgotar os 8 dígitos (00000000).        
    - Se CEP inválido: "CEP inválido".

### Escolhas técnicas

Para este projeto foi utilizado: (A) Node JS (por ser a ferramenta sugerida e que eu já tive algum contato anteriormente); (B) Banco de dados MySQL (foi utilizado uma base reduzida apenas com os CEP's do município de Franca-SP, somente para demonstração do projeto, para não ficar muito grande (em Mb) o dump da base); (C) Comunicação entre a aplicação e o banco de dados via Stored Procedures (para demonstrar o uso deste formato); (D) Documentação em Swagger; (E) Testes em Jest.

### Requisitos/Dependências

- node js (version 14.15.4)
- npm

- bcrypt
- cross-env
- dotenv
- express
- jsonwebtoken
- morgan
- mysql
- sequelize
- swagger-ui-express

Desenvolvimento

- jest
- nodemon
- supertest

### Instalação

npm install

### Conexão MySQL

Ajustar os parâmetros de conexão para as variáveis de ambiente nos arquivos ".env" e ".env.test"

### Para rodar a aplicação

npm start

### Testes

npm test
