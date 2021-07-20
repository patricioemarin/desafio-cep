const cnsMySQL = require('../config/mysql').varPool;

exports.getHealth = async (request, response, next) => {
    try {
        cnsMySQL.getConnection((error, connection) => {
            if (connection.state === 'connected') {
                connection.release();
                return response.status(200).send({response: "Banco de dados conectado com sucesso!"});
            } else {
                return response.status(500).send({response: "Não foi possível conectar a base de dados!"});
            }
        });
    } catch (error) {
        return response.status(500).send({error: "Não foi possível conectar a base de dados: " + error});
    }
};