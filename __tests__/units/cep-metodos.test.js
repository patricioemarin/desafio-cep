const cnsMetodosCEP = require('../../utils/cep-metodos');

// Categoria de teste de Métodos CEP (Endereços)
describe('Métodos CEP', () => {
    
    it('o formato do é CEP válido', () => {
        // Retorno da validação de formato de CEP
        const booCEP = cnsMetodosCEP.ValidarCEP('14760000');
        
        // Resposta de formato de CEP válido
        expect(booCEP).toBe(true);
    });

    it('o formato do CEP é inválido', () => {
        // Retorno da validação de formato de CEP
        const booCEP = cnsMetodosCEP.ValidarCEP('AA12352');
        
        // Resposta de formato de CEP inválido
        expect(booCEP).toBe(false);
    });
});