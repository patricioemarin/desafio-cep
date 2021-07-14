const cnsExpress = require('express');
const cnsRouter = cnsExpress.Router();
const cnsMySQL = require('../mysql').varPool;

// Insere ou altera um endereço
cnsRouter.post('/', (request, response, next) => {
    cnsMySQL.getConnection((error, connection) => {
        connection.query(
            'call sp_post_cep(?,?,?,?,?,?);',
            [request.body.cep,
            request.body.uf,
            request.body.cidade,
            request.body.bairro,
            request.body.logradouro,
            request.body.complemento],
            (error, result, fields) => {
                // Liberação da conexão com o banco de dados para não estourar o limite
                connection.release();
                if (error) {
                    return response.status(500).send ({
                        error: error,
                        response: null
                    });
                }
                response.status(201).send({
                    mensagem: "Endereço inserido com sucesso"
                });
            }
        )
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