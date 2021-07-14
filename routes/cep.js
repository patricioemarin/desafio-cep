const cnsExpress = require('express');
const cnsRouter = cnsExpress.Router();

// Insere endereço
cnsRouter.post('/', (request, response, next) => {
    response.status(201).send({
        mensagem: "Preparação de rota para inclusão de CEP"
    });
});

// Retorna endereço específico de um CEP
cnsRouter.get('/:id_cep', (request, response, next) => {
    const cnsID_CEP = request.params.id_cep;
    response.status(200).send({
        mensagem: "Preparação de rota para consulta de endereço por CEP",
        id_cep: cnsID_CEP
    });
});

// Usando Path na rota de CEPS
cnsRouter.patch('/', (request, response, next) => {
    response.status(201).send({
        mensagem: "Usando o patch dentro da rota de CEPS"
    });
});

// Exclui um endereço
cnsRouter.delete('/', (request, response, next) => {
    response.status(201).send({
        mensagem: "Preparação de rota para exclusão de endereço por CEP"
    });
});

module.exports = cnsRouter;