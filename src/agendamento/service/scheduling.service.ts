import { CreatingSchedulingDTO } from "../dto/scheduling.dto";
import { appointmentMock } from "../mocks/scheduling.mock";
import { SchedulingResponse } from "../interface/scheduling.interface";
import { CustomError } from "../../utils/customError"

export class SchedulingService {

     postScheduling(
        bodyParameters: CreatingSchedulingDTO
    ): SchedulingResponse {
        if (!bodyParameters?.medico_id) {
            throw new CustomError("ID do médico não fornecido", 400);
        }

        const medic = appointmentMock.medicos.find(medic => medic.id === Number(bodyParameters.medico_id));
        
        if (!medic) {
            throw new CustomError("Médico não encontrado", 404);
        }
        
        if (!medic.horarios_disponiveis.includes(bodyParameters.data_horario)) {
            throw new CustomError("Horário de agendamento não disponível", 400);
        }
        
        const response: SchedulingResponse = {
            mensagem: "Agendamento realizado com sucesso",
            agendamento: {
                medico: medic.nome,
                paciente: bodyParameters.paciente_nome,
                data_horario: bodyParameters.data_horario,
            }
        };

        return response;
    }
}
