
import { CreatingSchedulingDTO } from "../dto/scheduling.dto"
import { SchedulingService } from "../service/scheduling.service"
import { SchedulingResponse } from "../interface/scheduling.interface"
import { CustomError } from "../../utils/customError"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { LambdaError, LambdaResponse } from "../../utils/lambdaResponse.interface";
import { createControllerResponse } from "../../utils/response"


export class SchedulingController {
    private readonly schedulingService: SchedulingService;

    constructor() {
        this.schedulingService = new SchedulingService();
    }

    async postScheduling(
        bodyParameters: CreatingSchedulingDTO,
    ): Promise<LambdaResponse<SchedulingResponse | LambdaError>> {
        try {
            const dto = await validate(plainToInstance(CreatingSchedulingDTO, bodyParameters));

            if (dto.length > 0) {
                return {
                    statusCode: 400,
                    body: { error: { message: "Dados passados incorretamente" } }
                };
            }

            const bodyResponse =  this.schedulingService.postScheduling(bodyParameters);

            return createControllerResponse(201, bodyResponse);

        } catch (error) {
            console.error("Erro capturado no Controller:", error);
            console.error("Erro capturado no Body:", bodyParameters);

            if (error instanceof CustomError) {
                return {
                    statusCode: error.statusCode,
                    body: {
                        error: {
                            message: error.message,
                            name: error.name
                        }
                    }
                };
            }

            return {
                statusCode: 500,
                body: {
                    error: {
                        message: "Internal Server Error",
                        name: 'unknown'
                    }
                }
            };
        }
    }
}