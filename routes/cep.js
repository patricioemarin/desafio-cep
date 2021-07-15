const cnsExpress = require('express');
const cnsRouter = cnsExpress.Router();
const cnsMySQL = require('../mysql').varPool;

// Insere ou altera um endereço
cnsRouter.post('/', (request, response, next) => {
    cnsMySQL.getConnection((error, connection) => {
        if (error) { return response.status(500).send({error: error})}
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
                if (error) { return response.status(500).send({error: error})}
                return response.status(200).send({response: result[0]});
            }
        )
    });
});

// Retorna endereço específico de um CEP
cnsRouter.get('/:id_cep', (request, response, next) => {  
    cnsMySQL.getConnection((error, connection) => {
        if (error) { return response.status(500).send({error: error})}
        connection.query(
            'call sp_get_cep(?);',
            [request.params.id_cep],
            (error, result, fields) => {
                // Liberação da conexão com o banco de dados para não estourar o limite
                connection.release();
                if (error) { return response.status(500).send({error: error})}
                if (result.length == 0) {
                    return response.status(404).send({response: 'Endereço não localizado'})
                }
                return response.status(200).send({response: result[0]});
            }
        )
    });
});

// Exclusão de um endereço
cnsRouter.delete('/', (request, response, next) => {
    cnsMySQL.getConnection((error, connection) => {
        if (error) { return response.status(500).send({error: error})}
        connection.query(
            'call sp_delete_cep(?);',
            [request.body.cep],
            (error, result, fields) => {
                // Liberação da conexão com o banco de dados para não estourar o limite
                connection.release();
                if (error) { return response.status(500).send({error: error})}
                // Boa prática de informar os parâmetros de inclusão no processo de exclusão
                const cnsResponse = {
                    mensagem: result[0],
                    request: {
                        tipo: "POST",
                        descricao: "Especificação para inclusão de endereço",
                        url: "http://localhost:3000/cep/",
                        body: {
                            cep: 'varchar(08)',
                            uf: 'char(02)',
                            cidade: 'varchar(60)',
                            bairro: 'varchar(72)',
                            logradouro: 'varchar(72)',
                            complemento: 'varchar(100)'
                        }
                    }
                }
                return response.status(200).send({response: cnsResponse});
            }
        )
    });
});

module.exports = cnsRouter;