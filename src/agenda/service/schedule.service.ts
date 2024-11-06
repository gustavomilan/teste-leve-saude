import { ScheduleDTO } from "../dto/schedule.dto";
import { appointmentMock } from "../mocks/schedule.mock";
import { ScheduleResource } from "../interface/schedule.interface";
import { CustomError } from "../../utils/customError"


export class ScheduleService{

     getSchedule(
        queryStringParameters: ScheduleDTO, 

    
    ) : ScheduleResource {
        
        if (queryStringParameters?.id) {

            const medic = appointmentMock.medicos.some((medic) => medic.id === Number(queryStringParameters.id));
            if (!medic) {
                throw new CustomError("Médico não encontrado", 404);
            }
            const filtered = appointmentMock.medicos.find((medic) => 
            { 
                return medic.id === Number(queryStringParameters.id);
            });
            
            return {medicos :[filtered]} ;
        }
        
        return appointmentMock
    } 
}