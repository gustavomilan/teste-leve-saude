import { ScheduleController } from "./agenda/controller/schedule.controller"
import { SchedulingController } from "./agendamento/controller/scheduling.controller";
import { createLambdaResponse } from "./utils/response";

class Container{

    async getSchedule ({ queryStringParameters}){
        const {body, statusCode} = await new ScheduleController().getSchedule(
            queryStringParameters,
        )
        return createLambdaResponse(statusCode, body)
    }

    
    async postScheduling ({body}){
        const {body:bodyController,statusCode}  = await new SchedulingController().postScheduling(
            JSON.parse(body),
        )
        return createLambdaResponse(statusCode, bodyController)
    }
}


export const {
    getSchedule,
    postScheduling
} = new Container();