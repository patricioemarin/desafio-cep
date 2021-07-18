const cnsMySQL = require('../mysql');
const cnsBCrypt = require('bcrypt');
const cnsJWT = require('jsonwebtoken');

exports.postUsuario = async (request, response, next) => {
    try {
        const cnsHash = cnsBCrypt.hashSync(request.body.senha, 10);
        const cnsResult = await cnsMySQL.execute(
            'call sp_post_usuario(?,?,?,?);',
            [request.body.id,
            request.body.nome,
            request.body.email,
            cnsHash],
        );
    
        // Em caso de processamento realizado com sucesso, define o status com o retorno da procedure:
        // 200 = OK | 500 = Internal Server Error
        return response.status(cnsResult[0][0].resId).send({response: cnsResult[0][0]});
    } catch (error) {
        return response.status(500).send({error: error});
    }
};

exports.deleteUsuario = async (request, response, next) => {
    try {
        const cnsResult = await cnsMySQL.execute(
                'call sp_delete_usuario(?);',
                [request.body.id]
            );
        
        // Em caso de processamento realizado com sucesso, define o status com o retorno da procedure:^
        // 200 = OK | 404 = Not Found | 500 = Internal Server Error
        return response.status(cnsResult[0][0].resId).send({response: cnsResult[0][0]});
    } catch (error) {
        return response.status(500).send({error: error});
    }
};

exports.loginUsuario = async (request, response, next) => {
    try {
        const cnsResult = await cnsMySQL.execute(
            'select * from tbusuario where usuEmail = ?;',
            [request.body.email],
        );
        
        if (cnsResult.length < 1) {
            return response.status(401).send({response: "Falha na autenticação"});
        }
        
        if (await cnsBCrypt.compareSync(request.body.senha, cnsResult[0].usuSenha)) {
            
            const cnsToken = cnsJWT.sign({
                id_usuario: cnsResult[0].usuId,
                email: cnsResult[0].usuEmail
            }, 
            process.env.JWT_KEY, 
            {
                expiresIn: '1h'
            });
            return response.status(200).send({
                response: "Autenticado com sucesso",
                token: cnsToken
            }); 
        }

        return response.status(401).send({response: "Falha na autenticação 2"});
    } catch (error) {
        return response.status(500).send({error: 'Falha na autenticação 3'});
    }
}