"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createControllerResponse = exports.createLambdaResponse = void 0;
const createLambdaResponse = (statusCode, data) => {
    return {
        statusCode,
        body: JSON.stringify(data),
    };
};
exports.createLambdaResponse = createLambdaResponse;
const createControllerResponse = (statusCode, body) => {
    return {
        statusCode,
        body,
    };
};
exports.createControllerResponse = createControllerResponse;
