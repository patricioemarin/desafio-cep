module.exports = {
    // Limpeza automática de chamadas e instâncias simuladas entre cada teste
    clearMocks: true,

    // Indica se as informações de cobertura devem ser coletadas durante a execução do teste
    collectCoverage: true,

    // Indica qual provedor deve ser usado para instrumentar o código
    coverageProvider: "babel",
    
    // Ambiente de teste que será usado
    testEnvironment: "node",
};