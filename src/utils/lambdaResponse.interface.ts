// Interface para uma resposta padrão da Lambda com tipo genérico
export interface LambdaResponse<T> {
  statusCode: number;
  body: T;
}

// Interface para erros da Lambda com uma estrutura padrão
export interface LambdaError {
  error: {
    message: string;
    name?: string;
  };
}
