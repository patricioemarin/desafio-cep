var varMySQL = require('mysql');

// Inclusão e tratamento de variáveis de ambiente utilizadas
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

var varPool = varMySQL.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
});

exports.execute = (query, params=[]) => {
    console.log('TESTE AQUI!');
    return new Promise((resolve, reject) => {
        // Quando usa o Pool, se fizer direto o ".query" não precisa do release().
        varPool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

exports.varPool = varPool;