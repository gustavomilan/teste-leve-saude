// Função para criar a resposta da Lambda, com body em formato JSON
export const createLambdaResponse = (statusCode: number, data: any ) => {
  return {
    statusCode,
    body: JSON.stringify(data),
  };
};

// Função para criar a resposta do Controller, passando o body diretamente
export const createControllerResponse = (statusCode: number, body: any ) => {
  return {
    statusCode,
    body,
  };
};
