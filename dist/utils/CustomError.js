class CustomError extends Error {
    constructor(message, statusCode) {
        super(message); // Mensagems para a classe Error
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Define o nome do erro como o nome da classe
    }
}
