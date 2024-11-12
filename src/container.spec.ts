import { getSchedule, postScheduling } from '../src/container';

const controllerResponse = {
  body: 'someData',
  statusCode: 200,
};

const scheduleControllerMock = {
  getSchedule: jest.fn(() => controllerResponse),
};

const schedulingControllerMock = {
  postScheduling: jest.fn(() => controllerResponse),
};

jest.mock('./schedule/controller/schedule.controller', () => {
  return {
    ScheduleController: jest.fn(() => scheduleControllerMock),
  };
});

jest.mock('./scheduling/controller/scheduling.controller', () => {
  return {
    SchedulingController: jest.fn(() => schedulingControllerMock),
  };
});

describe('Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSchedule', () => {
    it('should call ScheduleController.getSchedule with the provided params', async () => {
      const response = await getSchedule({ queryStringParameters: 1 });

      expect(response).toStrictEqual({
        statusCode: controllerResponse.statusCode,
        body: JSON.stringify(controllerResponse.body),
      });
    });

    it('should call ScheduleController.getSchedule with empty params', async () => {
      const response = await getSchedule({ queryStringParameters: {} });

      expect(scheduleControllerMock.getSchedule).toHaveBeenCalledTimes(1);
      expect(scheduleControllerMock.getSchedule).toHaveBeenCalledWith({});
      expect(response).toStrictEqual({
        statusCode: controllerResponse.statusCode,
        body: JSON.stringify(controllerResponse.body),
      });
    });
  });

  describe('postScheduling', () => {
    it('should call SchedulingController.postScheduling with the provided params', async () => {
      const params = {
        medico_id: 1,
        paciente_nome: 'Paciente Teste',
        data_horario: '2024-10-05 09:00',
      };

      const response = await postScheduling({
        body: JSON.stringify(params), // Passa `body` como string JSON
      });

      expect(schedulingControllerMock.postScheduling).toHaveBeenCalledTimes(1);
      expect(schedulingControllerMock.postScheduling).toHaveBeenCalledWith(
        params,
      );
      expect(response).toStrictEqual({
        statusCode: controllerResponse.statusCode,
        body: JSON.stringify(controllerResponse.body),
      });
    });
  });
});
