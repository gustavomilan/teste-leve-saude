import { createControllerResponse, createLambdaResponse } from './response';

describe('createControllerResponse', () => {
  it('should return statusCode and body', () => {
    const response = createControllerResponse(200, { any: 'data' });
    expect(response).toStrictEqual({
      statusCode: 200,
      body: { any: 'data' },
    });
  });
});

describe('createLambdaResponse', () => {
  it('should return statusCode and stringfied body', () => {
    const response = createLambdaResponse(200, { any: 'data' });
    expect(response).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify({ any: 'data' }),
    });
  });
});
