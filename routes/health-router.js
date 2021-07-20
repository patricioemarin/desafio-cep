const cnsExpress = require('express');
const cnsRouter = cnsExpress.Router();
const cnsHealthController = require('../controllers/health-controller');

// Retorna o estado da conexão
cnsRouter.get('/', cnsHealthController.getHealth);

module.exports = cnsRouter;