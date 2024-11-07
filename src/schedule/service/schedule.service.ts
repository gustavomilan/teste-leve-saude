import { ScheduleDTO } from '../dto/schedule.dto';
import { appointmentMock } from '../mocks/schedule.mock';
import { ScheduleResource } from '../interface/schedule.interface';
import { CustomError } from '../../utils/customError';

export class ScheduleService {
  // Tipagem explícita do parâmetro e retorno para garantir consistência
  getSchedule(queryStringParameters: ScheduleDTO): ScheduleResource {
    if (queryStringParameters?.id) {
      // Usa find para localizar o médico; se não for encontrado, lança o erro diretamente
      const filtered = appointmentMock.medicos.find(
        (medic) => medic.id === Number(queryStringParameters.id),
      );

      if (!filtered) {
        throw new CustomError('Médico não encontrado', 404);
      }

      // Retorna o médico encontrado em um array conforme estrutura de ScheduleResource
      return { medicos: [filtered] };
    }

    // Retorna todos os médicos se nenhum ID foi fornecido
    return appointmentMock;
  }
}
