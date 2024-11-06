export interface LambdaResponse<T>{
    statusCode : number
    body: T
}

export interface LambdaError{
    error: {
        message: string;
        name?: string;
    }

}