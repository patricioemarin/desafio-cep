const cnsReqSupertest = require('supertest');
const cnsApp = require('../../app');
const cnsMySQL = require('../../mysql').varPool;

// Categoria de teste de CEP (Endereços)
describe('CEP', () => {

    // Procedimentos para garantir o fechamento da conexão com o banco de dados.
    beforeAll(done => {
        done()
    });
    
    afterAll( async () => {
        await cnsMySQL.close();
        //cnsMySQL.getConnection((error, connection) => {
        //    connection.release();
        //});
    });

    it('é possível incluir um novo endereço (CEP)', async () => {
        const cnsResSupertest = await cnsReqSupertest(cnsApp).post('/cep').send({
            "cep": "14760000",
            "uf": "SP",
            "cidade": "Franca",
            "bairro": "Condado de Ibity",
            "logradouro": "Rua do condado",
            "complemento": "É aqui mesmo :-)"
        });

        // Resposta verdadeira da inclusão do endereço (CEP)
        expect(cnsReqSupertest).toBeTruthy();
    });
});