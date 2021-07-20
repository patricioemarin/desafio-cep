const cnsReqSupertest = require('supertest');
const cnsApp = require('../../app');
const cnsMySQL = require('../../config/mysql');

// Categoria de teste dos usuários da API
describe('CEP', () => {

    beforeAll(async () => {
        // Aumenta o Timeout
        jest.setTimeout(15 * 1000);
    });

    afterAll(async () => {
        // Fecha a conexão com o banco de dados
        cnsMySQL.close();
        // Reseta o Timeout
        jest.setTimeout(5 * 1000);
    });

    it('o usuário é cadastrado', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).post('/usuario').send({
            "id": 2,
            "nome": "Asdrubal Never",
            "email": "asdrubal@never.com",
            "senha": "primeirasenha"
        });

        expect(cnsResSupertest.status).toBe(200);
    });

    it('o usuário não está autenticado [e-mail ou senha inválido(a)]', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).post('/usuario/login').send({
            "email": "usuario@email.com.br",
            "senha": "1234567"
        });

        expect(cnsResSupertest.status).toBe(401);
    });

    it('o usuário está autenticado', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).post('/usuario/login').send({
            "email": "email@provedor.com",
            "senha": "senha1234"
        });

        // Recebe o Token para autorização das próximas transações de teste
        testToken = cnsResSupertest.body.token;
        
        expect(cnsResSupertest.status).toBe(200);
    });
    
    it('o usuário é excluído', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).delete('/usuario')
            .set('Authorization', `Bearer ${testToken}`)    
            .send({
            "id": 2
        });

        expect(cnsResSupertest.status).toBe(200);
    });
    
    it('o usuário é a ser excluído não é localizado', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).delete('/usuario')
            .set('Authorization', `Bearer ${testToken}`)    
            .send({
            "id": 2
        });
        
        expect(cnsResSupertest.status).toBe(404);
    });

    it('o usuário não é excluído [Falha na autenticação]', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).delete('/usuario')
            .set('Authorization', '')    
            .send({
            "id": 2
        });

        expect(cnsResSupertest.status).toBe(401);
    });

    it('é possível incluir um novo endereço (CEP)', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).post('/cep')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
            "cep": "14760000",
            "uf": "SP",
            "cidade": "Franca",
            "bairro": "Condado de Ibity",
            "logradouro": "Rua do condado",
            "complemento": "É aqui mesmo :-)"
        });

        expect(cnsResSupertest.status).toBe(200);
    });

    it('é possível alterar um endereço (CEP)', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).post('/cep')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
            "cep": "14760000",
            "uf": "SP",
            "cidade": "Franca City",
            "bairro": "Condado de Ibity em Franca",
            "logradouro": "Rua do condado...",
            "complemento": "É aqui mesmo :-)"
        });

        expect(cnsResSupertest.status).toBe(200);
    });

    it('não é possível alterar um endereço (CEP) [Falha na autenticação]', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).post('/cep')
            .set('Authorization', '')
            .send({
            "cep": "14760000",
            "uf": "SP",
            "cidade": "Franca City",
            "bairro": "Condado de Ibity em Franca",
            "logradouro": "Rua do condado...",
            "complemento": "É aqui mesmo :-)"
        });

        expect(cnsResSupertest.status).toBe(401);
    });

    it('é possível consultar um CEP', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).get('/cep/14412999');

        // O CEP 14412999 não existe, porém ao trocar os dígitos por zeros é encontrado (200) o CEP 14412000
        expect(cnsResSupertest.status).toBe(200);
    });

    it('o CEP não é localizado', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).get('/cep/99750222');

        expect(cnsResSupertest.status).toBe(404);
    });

    it('é possível excluir um endereço (CEP)', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).delete('/cep')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
            "cep": "14760000"
        });

        expect(cnsResSupertest.status).toBe(200);
    });
    
    it('não é possível excluir um endereço (CEP) [CEP inválido / não encontrado]', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).delete('/cep')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
            "cep": "14760000"
        });

        expect(cnsResSupertest.status).toBe(404);
    });
});