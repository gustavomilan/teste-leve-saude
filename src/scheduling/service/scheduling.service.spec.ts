import { CustomError } from "../../utils/customError";
import { SchedulingService } from "./scheduling.service";
import { appointmentMock } from "../mocks/scheduling.mock";

describe ('SchedulingService', () => {
    let service: SchedulingService

    beforeEach(() => {
        service = new SchedulingService();
        jest.clearAllMocks();
    })

    describe('postScheduling', () => {

        it('should return a CustomError when medico_id is not provided', () => {
            const response = {
              medico_id: null, // sem ID
              paciente_nome: 'Paciente Teste',
              data_horario: '2024-10-05 09:00',
            };
      
            expect(() => {
              service.postScheduling(response);
            }).toThrow(new CustomError('ID do médico não fornecido', 404));
        });

        it('should return a successful scheduling response ', () => {
            const query = {
              medico_id: 1, 
              paciente_nome: 'Paciente Teste',
              data_horario: '2024-10-05 09:00', 
            };
      
            // Pega o nome do medico do mock, pois não vem na query
            const medic = appointmentMock.medicos.find(
              (medic) => medic.id === Number(query.medico_id)
            );
      
            const response = service.postScheduling(query);
            expect(response).toEqual({
              mensagem: 'Agendamento realizado com sucesso',
              agendamento: {
                medico: medic.nome,
                paciente: query.paciente_nome,
                data_horario: query.data_horario,
            }})
        })

        it('should return a CustomError when dont find a medic', () => {
            const response = {
              medico_id: 9999, // ID indisponivel
              paciente_nome: 'Paciente Teste',
              data_horario: '2024-10-05 09:00',
            };
      
            expect(() => {
              service.postScheduling(response);
            }).toThrow(new CustomError('Médico não encontrado', 404));
        });

        it('should return a CustomError when the scheduling dont exist', () => {
            const response = {
              medico_id: 1, 
              paciente_nome: 'Paciente Teste',
              data_horario: '999999999', // Horario indisponivel
            };

            expect(() => {
              service.postScheduling(response);
            }).toThrow(new CustomError('Horário de agendamento não disponível', 404));
          })

    })

})