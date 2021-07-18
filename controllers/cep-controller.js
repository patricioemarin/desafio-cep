const cnsMySQL = require('../mysql');
const cnsMetodosCEP = require('../utils/cep-metodos');

exports.getCEP = async (request, response, next) => {
    try {
        if (cnsMetodosCEP.ValidarCEP(request.params.cep) == false) {
            return response.status(401).send({response: "CEP inválido"});
        } else {
            const cnsResult = await cnsMySQL.execute(
                    'call sp_get_cep(?);',
                    [request.params.cep]
                );
            
            // Em caso de processamento realizado com sucesso, define o status com o retorno da procedure:^
            // 200 = OK | 404 = Not Found | 500 = Internal Server Error
            return response.status(cnsResult[0][0].resId).send({response: cnsResult[0][0]});
        }
    } catch (error) {
        return response.status(500).send({error: error});
    }
};

exports.postCEP = async (request, response, next) => {
    try {
        if (cnsMetodosCEP.ValidarCEP(request.body.cep) == false) {
            return response.status(401).send({response: "CEP inválido"});
        } else {
            const cnsResult = await cnsMySQL.execute(
                'call sp_post_cep(?,?,?,?,?,?);',
                [request.body.cep,
                request.body.uf,
                request.body.cidade,
                request.body.bairro,
                request.body.logradouro,
                request.body.complemento],
            );
        
            // Em caso de processamento realizado com sucesso, define o status com o retorno da procedure:
            // 200 = OK 500 = Internal Server Error
            return response.status(cnsResult[0][0].resId).send({response: cnsResult[0][0]});
        }
    } catch (error) {
        return response.status(500).send({error: error});
    }
};

exports.deleteCEP = async (request, response, next) => {
    try {
        if (cnsMetodosCEP.ValidarCEP(request.body.cep) == false) {
            return response.status(401).send({response: "CEP inválido"});
        } else {
            const cnsResult = await cnsMySQL.execute(
                    'call sp_delete_cep(?);',
                    [request.body.cep]
                );
            
            // Em caso de processamento realizado com sucesso, define o status com o retorno da procedure:^
            // 200 = OK | 404 = Not Found | 500 = Internal Server Error
            return response.status(cnsResult[0][0].resId).send({response: cnsResult[0][0]});
        }
    } catch (error) {
        return response.status(500).send({error: error});
    }
};