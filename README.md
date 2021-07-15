# desafio-cep
Projeto Desafio Técnico CEP: API em Node JS

# Requisitos/Dependências

- node js (version 14.15.4)
- express
- nodemon
- morgan
- MySQL
- jest
- swagger-ui-express
- npm

# Instalação

npm install

# Conexão MySQL

Ajustar os parâmetros de conexão para as variáveis de ambiente no arquivo nodemon.js

# Para rodar a aplicação

npm start

# Projeto Desafio Técnico Luizalabs
## Primeira etapa do desafio

1.0) API para responder à requisição de consulta de CEP para preenchimento automático de endereço no front
    1.1) Se CEP válido: resposta com o endereço correspondente
    1.2) Se CEP válido mas com endereço inexistente: substituição dos dígitos da direita para esquerda         
        1.2.1) (Os 3 dígitos da direita são os identificadores de distribuição dos correios)
    1.3 Se CEP inválido: retorno JSON da mensagem: "CEP inválido"

# Orientações para teste do item 1.2.1

- Utilizar um CEP com os 5 primeiros dígitos em 14412, por exemplo: 14412999