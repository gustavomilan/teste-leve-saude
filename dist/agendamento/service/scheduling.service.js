"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingService = void 0;
const scheduling_mock_1 = require("../mocks/scheduling.mock");
const customError_1 = require("../../utils/customError");
class SchedulingService {
    postScheduling(bodyParameters) {
        if (!(bodyParameters === null || bodyParameters === void 0 ? void 0 : bodyParameters.medico_id)) {
            throw new customError_1.CustomError("ID do médico não fornecido", 400);
        }
        const medic = scheduling_mock_1.appointmentMock.medicos.find(medic => medic.id === Number(bodyParameters.medico_id));
        if (!medic) {
            throw new customError_1.CustomError("Médico não encontrado", 404);
        }
        if (!medic.horarios_disponiveis.includes(bodyParameters.data_horario)) {
            throw new customError_1.CustomError("Horário de agendamento não disponível", 400);
        }
        const response = {
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
exports.SchedulingService = SchedulingService;
