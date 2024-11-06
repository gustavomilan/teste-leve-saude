"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const schedule_mock_1 = require("../mocks/schedule.mock");
const customError_1 = require("../../utils/customError");
class ScheduleService {
    getSchedule(queryStringParameters) {
        if (queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.id) {
            const medic = schedule_mock_1.appointmentMock.medicos.some((medic) => medic.id === Number(queryStringParameters.id));
            if (!medic) {
                throw new customError_1.CustomError("Médico não encontrado", 404);
            }
            const filtered = schedule_mock_1.appointmentMock.medicos.find((medic) => {
                return medic.id === Number(queryStringParameters.id);
            });
            return { medicos: [filtered] };
        }
        return schedule_mock_1.appointmentMock;
    }
}
exports.ScheduleService = ScheduleService;
