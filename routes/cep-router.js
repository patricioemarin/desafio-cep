const cnsExpress = require('express');
const cnsRouter = cnsExpress.Router();
const cnsLogin = require('../middlewares/login');
const cnsCEPController = require('../controllers/cep-controller');

// Insere ou altera um endereço pelo CEP
cnsRouter.post('/', cnsLogin, cnsCEPController.postCEP);

// Retorna endereço específico de um CEP
cnsRouter.get('/:cep', cnsCEPController.getCEP);

// Exclusão de um endereço pelo CEP
cnsRouter.delete('/', cnsLogin, cnsCEPController.deleteCEP);

module.exports = cnsRouter;