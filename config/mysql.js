var varMySQL = require('mysql');

// Inclusão e tratamento de variáveis de ambiente utilizadas
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

var varPool = varMySQL.createPool({
    "connectionLimit": 1000,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        // O Pool de conexão usando diretamente o método ".query" não necessita de ".release()".
        varPool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

exports.close = () => {
    varPool.end();
};

exports.varPool = varPool;