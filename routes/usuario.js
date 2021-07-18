const cnsExpress = require('express');
const cnsRouter = cnsExpress.Router();
const cnsMySQL = require('../mysql').varPool;
const cnsLogin = require('../middlewares/login');
const cnsUsuarioController = require('../controllers/usuario-controller');

// Insere ou altera um usuário
cnsRouter.post('/', cnsLogin, cnsUsuarioController.postUsuario);

// Exclusão de um usuário
cnsRouter.delete('/', cnsLogin, cnsUsuarioController.deleteUsuario);

// Autenticação de um usuário
cnsRouter.post('/login', cnsUsuarioController.loginUsuario);

module.exports = cnsRouter;