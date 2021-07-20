![GitHub repo size](https://img.shields.io/github/repo-size/patricioemarin/desafio-cep)
![GitHub language count](https://img.shields.io/github/languages/count/patricioemarin/desafio-cep)

:sweat_smile: :computer: :factory: 
# Desafio Técnico LuizaLabs: API Rest em Node JS - CEP

## Descrição do Projeto

##### A API tem como objetivo principal a consulta de endereço por CEP. A API disponibiliza também um CRUD de usuários para autenticação e proteção de algumas rotas. As rotas protegidas por autenticação são: (A) Exclusão de usuário; (B) Cadastro de CEP; (C) Exclusão de CEP. As rotas de cadastro de usuário e consulta de CEP ficaram propositalmente livres de autenticação. A validação do CEP foi feita através de um método simples com expressão regular apenas para fins didáticos, pensando em um projeto em produção poderia ser interessante uma validação através de uma possível API dos correios (em caso de disponibilidade do serviço). 

### Rotas

- [GET] http://localhost:3000/health <br>Verificação da saúde da aplicação (status da conexão com dba)
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

Obs: 

    - Sugestão de CEP para o cenário de troca de dígitos: Usar 14412999, será encontrado 14412000
    - Para autenticação de usuário (acesso ao token), usar:
        - email: email@provedor.com
        - senha: senha1234

### Escolhas técnicas

Para este projeto foi utilizado: (A) Node JS (por ser a ferramenta sugerida e que eu já tive algum contato anteriormente); (B) Banco de dados MySQL (foi utilizado uma base reduzida apenas com os CEP's do município de Franca-SP, somente para demonstração do projeto, para não ficar muito grande (em Mb) o dump da base); (C) Comunicação entre a aplicação e o banco de dados via Stored Procedures (para demonstrar o uso deste formato); (D) Documentação em Swagger; (E) Testes em Jest (obs: foram utilizadas 2 bases de dados distintas para separar a base de testes, sendo que os dump's foram realizados com o MySQL Workbench). 
A senha do usuário é gravada em hash e token gerado através de JWT

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
- swagger-ui-express

Desenvolvimento

- jest
- nodemon
- supertest

### Instalação

npm install

### Conexão MySQL

Ajustar os parâmetros de conexão para as variáveis de ambiente nos arquivos ".env" e ".env.test":

- MYSQL_USER
- MYSQL_PASSWORD
- MYSQL_DATABASE
- MYSQL_HOST
- MYSQL_PORT

### Comando para rodar a aplicação

npm start

### Comando para rodar os Testes

npm test

### Considerações finais

P.S. :pushpin: Alguns dos itens solicitados para o desenvolvimento do projeto demandaram um tempo razoável de pesquisa por serem recursos que eu não estava habituado a utilizar em minhas experiências profissionais anteriores (como Swagger e principalmente os recursos para Testes). 
Em relação aos itens "opcionais" como as métricas e o log estruturado não consegui finalizar dentro dos 7 dias de desenvolvimento, demandariam um pouco mais de pesquisa e programação.

:taurus: :pray: :punch:

Muito obrigado pela oportunidade de fazer o desafio técnico, foi desafiador e ao mesmo tempo gratificante!