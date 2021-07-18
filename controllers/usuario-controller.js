const cnsMySQL = require('../mysql').varPool;
const cnsBCrypt = require('bcrypt');
const cnsJWT = require('jsonwebtoken');

exports.postUsuario = (request, response, next) => {
    cnsMySQL.getConnection((error, connection) => {
        if (error) { return response.status(500).send({error: error})}
        // Criptografa a senha do usuário
        cnsBCrypt.hash(request.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return response.status(500).send({error: errBcrypt})}
            connection.query(
                'call sp_post_usuario(?,?,?,?);',
                [request.body.id,
                request.body.nome,
                request.body.email,
                hash],
                (error, result, fields) => {
                    // Liberação da conexão com o banco de dados para não estourar o limite
                    connection.release();
                    if (error) { return response.status(500).send({error: error})}
                    return response.status(200).send({response: result[0]});
                }
            )
        });
    });
};

exports.deleteUsuario = (request, response, next) => {
    cnsMySQL.getConnection((error, connection) => {
        if (error) { return response.status(500).send({error: error})}
        connection.query(
            'call sp_delete_usuario(?);',
            [request.body.id],
            (error, result, fields) => {
                // Liberação da conexão com o banco de dados para não estourar o limite
                connection.release();
                if (error) { return response.status(500).send({error: error})}
                return response.status(200).send({response: result[0]});
            }
        )
    });
};

exports.loginUsuario = (request, response, next) => {
    cnsMySQL.getConnection((error, connection) => {
        if (error) { return response.status(500).send({error: error})}
        const cnsQuery = `select * from tbusuario where usuEmail = ?;`;
        connection.query(
            cnsQuery,
            [request.body.email],
            (error, result, fields) => {
                // Liberação da conexão com o banco de dados para não estourar o limite
                connection.release();
                if (error) { return response.status(500).send({error: error})}
                if (result.length < 1) {
                    return response.status(404).send({response: "Falha na autenticação"});
                }
                cnsBCrypt.compare(request.body.senha, result[0].usuSenha, (errBcrypt, resultBcrypt) => {
                    if (errBcrypt) { 
                        return response.status(404).send({response: "Falha na autenticação"}); 
                    }
                    if (resultBcrypt) {
                        const cnsToken = cnsJWT.sign({
                            id_usuario: result[0].usuId,
                            email: result[0].usuEmail
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
                    return response.status(404).send({response: "Falha na autenticação"}); 
                });
            }
        )
    });
};