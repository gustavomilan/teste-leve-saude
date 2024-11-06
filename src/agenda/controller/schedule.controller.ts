import { ScheduleResource } from "../interface/schedule.interface";
import { ScheduleService } from "../service/schedule.service";
import { ScheduleDTO } from "../dto/schedule.dto";
import { CustomError } from "../../utils/customError"
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { createControllerResponse } from "../../utils/response";
import { LambdaError, LambdaResponse } from "../../utils/lambdaResponse.interface";

export class ScheduleController{

    private readonly scheduleService: ScheduleService

    constructor(){
        this.scheduleService = new ScheduleService();
    }

    async getSchedule(

        queryStringParameters: ScheduleDTO, 
        
    ):Promise <LambdaResponse<ScheduleResource | LambdaError>> {
        try {

            if (queryStringParameters){
                const validationErrors = await validate(plainToInstance(ScheduleDTO, queryStringParameters))

            if (validationErrors.length > 0){

                return {
                        statusCode: 400, 
                        body:{ error: { message:"Dados passados incorretamente",
                        }}};
                }
            }
            
            const body = this.scheduleService.getSchedule(queryStringParameters)
            return createControllerResponse(200,body)

        } catch (error){
            if (error instanceof CustomError){

                return{ 
                    statusCode: error.statusCode, 
                    body: {
                        error: {
                            message: error.message,
                            name: error.name,
                        }}}
            }
        }

        return {
            statusCode: 500,
            body: {
                error:{
                    message:"Internal Server Error",
                    name: 'unknown'
                }
            }
        }

    }
}