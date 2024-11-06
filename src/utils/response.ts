export const createLambdaResponse = <T>(statusCode: number, data: T) => {
    return {
      statusCode,
      body: JSON.stringify(data),
    };
  };

  export const createControllerResponse = <T>(statusCode: number, body: T) => {
    return {
      statusCode,
      body,
    };
  };