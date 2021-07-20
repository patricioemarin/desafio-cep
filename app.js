const cnsExpress = require('express');
const cnsApp = cnsExpress();
const cnsMorgan = require('morgan');
const cnsRotasCEP = require('./routes/cep-router');
const cnsRotasUsuario = require('./routes/usuario-router');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./utils/swagger.json');

// Acesso à documentação Swagger
cnsApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Moninotamento (via terminal) das requisições para acompanhamento no desenvolvimento
cnsApp.use(cnsMorgan('dev'));

// Formato JSON de entrada
cnsApp.use(cnsExpress.json());

// Delimita o formato de entrada de dados (simples)
cnsApp.use(cnsExpress.urlencoded({extended: false})); 

// Rota de CEP (endereços)
cnsApp.use('/cep', cnsRotasCEP);

// Rota de Usuários
cnsApp.use('/usuario', cnsRotasUsuario);

// Tratamento para mensagem amigável em caso de não localização de rota
cnsApp.use((request, response, next) => {
    const cnsErro = new Error('Rota não localizada');
    cnsErro.status = 404;
    next(cnsErro);
});

cnsApp.use((error, request, response, next) => {
    response.status(error.status || 500);
    return response.send({
        erro: {
            mensagem: error.message
        }
    });
});
// Fim Tratamento para rota não localizada

module.exports = cnsApp;