"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.body = message;
    }
    static NotFound(body = "NÃO ENCONTRADO") {
        throw new Error(404, body);
    }
    static BadRequest(body = "REQUISIÇÃO INVÁLIDA") {
        throw new Error(400, body);
    }
    static InternalError(body = "ERRO INTERNO DO SERVIDOR") {
        throw new Error(500, body);
    }
}
exports.Error = Error;