
// Validação de CEP via expressão regular (8 dígitos numéricos)
module.exports = {
    ValidarCEP (cep) {
        const cnsERCEP = /^[0-9]{8}$/;
        return cnsERCEP.test(cep);
    }
}