const cnsJWT = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const cnsToken = request.headers.authorization.split(' ')[1];
        //const cnsToken = request.headers.authorization;
        const cnsTokenDecode = cnsJWT.verify(cnsToken, process.env.JWT_KEY);

        // Como o token é gerado com ID do usuário + e=mail, são essas as informações retornadas abaixo
        request.usuario = cnsTokenDecode;
        next();
    } catch (error) {
        return response.status(401).send({mensagem: 'Falha na autenticação'});
    }
}