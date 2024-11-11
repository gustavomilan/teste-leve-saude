import { CreatingSchedulingDTO } from '../dto/scheduling.dto';
import { appointmentMock } from '../mocks/scheduling.mock';
import { SchedulingResponse } from '../interface/scheduling.interface';
import { CustomError } from '../../utils/customError';

export class SchedulingService {
  postScheduling(bodyParameters: CreatingSchedulingDTO): SchedulingResponse {
    // Validação para garantir que o ID do médico foi fornecido
    if (!bodyParameters?.medico_id) {
      throw new CustomError('ID do médico não fornecido', 404);
    }

    // Busca o médico no mock com base no ID fornecido
    const medic = appointmentMock.medicos.find(
      (medic) => medic.id === Number(bodyParameters.medico_id),
    );

    // Lança um erro se o médico não for encontrado
    if (!medic) {
      throw new CustomError('Médico não encontrado', 404);
    }

    // Verifica se o horário desejado está disponível para o médico
    if (!medic.horarios_disponiveis.includes(bodyParameters.data_horario)) {
      throw new CustomError('Horário de agendamento não disponível', 404);
    }

    // Cria a resposta para o agendamento bem-sucedido
    const response: SchedulingResponse = {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: {
        medico: medic.nome,
        paciente: bodyParameters.paciente_nome,
        data_horario: bodyParameters.data_horario,
      },
    };

    // Retorna essa resposta
    return response;
  }
}
