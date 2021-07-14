# desafio-cep
Projeto Desafio Técnico CEP: API em Node JS

# Requisitos/Dependências

- node js (version 14.15.4)
- express
- nodemon
- morgan
- npm

# Instalação

npm install

# Para rodar a aplicação

npm start

# Projeto Desafio Técnico Luizalabs
## Primeira etapa do desafio

- API para responder à requisição de consulta de CEP para preenchimento automático de endereço no front
- Se CEP válido: resposta com o endereço correspondente
- Se CEP válido mas com endereço inexistente: substituição dos dígitos da direita para esquerda         
    - (Os 3 dígitos da direita são os identificadores de distribuição dos correios)
- Se CEP inválido: retorno JSON da mensagem: "CEP inválido"

