const cnsMySQL = require('../mysql').varPool;
const cnsMetodosCEP = require('../utils/cep-metodos');

exports.getCEP = (request, response, next) => {  
    if (cnsMetodosCEP.ValidarCEP(request.params.cep) == false) {
        return response.status(401).send({response: "CEP inválido"});
    } else {
        cnsMySQL.getConnection((error, connection) => {
            if (error) { return response.status(500).send({error: error})}
            connection.query(
                'call sp_get_cep(?);',
                [request.params.cep],
                (error, result, fields) => {
                    // Liberação da conexão com o banco de dados para não estourar o limite
                    connection.release();
                    if (error) { return response.status(500).send({error: error})}
                    console.log(result[0].cep);
                    return response.status(200).send({response:  result[0]});
                }
            )
        });
    }
};

/*
exports.getCEP = async (request, response, next) => {      
    // Retorno do resolve
    try {        
        //const cnsQuery = 'call sp_get_cep(?);';
        const cnsQuery = 'select * from tbcep where cepId = ?;';
        //console.log('CEP: ' + cnsQuery + ' / ' + request.params.cep);
        const cnsResult = await conMySQL.execute(cnsQuery, [request.params.cep]);
        //return response.status(200).send({response: cnsResult[0]});
    // Retorno do reject
    } catch (error) {
        return response.status(500).send ({error: error});
    }
};
*/

exports.postCEP = (request, response, next) => {
    if (cnsMetodosCEP.ValidarCEP(request.params.cep) == false) {
        return response.status(401).send({response: "CEP inválido"});
    } else {
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
    }
};

exports.deleteCEP = (request, response, next) => {
    if (cnsMetodosCEP.ValidarCEP(request.params.cep) == false) {
        return response.status(401).send({response: "CEP inválido"});
    } else {
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
                                cep: 'string(08)',
                                uf: 'string(02)',
                                cidade: 'string(60)',
                                bairro: 'string(72)',
                                logradouro: 'string(72)',
                                complemento: 'string(100)'
                            }
                        }
                    }
                    return response.status(200).send({response: cnsResponse});
                }
            )
        });
    }
};