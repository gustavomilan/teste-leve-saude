const scheduleServiceMock = {
  getSchedule: jest.fn(() => 'someData'),
};

const classValidatorMock = {
  ...jest.requireActual('class-validator'),
  validate: jest.fn(() => []),
};

const classTransformerMock = {
  plainToInstance: jest.fn(),
  ...jest.requireActual('class-transformer'),
};

import { CustomError } from '../../utils/customError';
import { ScheduleController } from './schedule.controller';

jest.mock('../service/schedule.service', () => {
  return {
    ScheduleService: jest.fn(() => scheduleServiceMock),
  };
});

jest.mock('class-validator', () => {
  return classValidatorMock;
});

jest.mock('class-transformer', () => {
  return classTransformerMock;
});

describe('ScheduleController', () => {
  let controller: ScheduleController;

  beforeEach(() => {
    controller = new ScheduleController();
    jest.clearAllMocks();
  });

  describe('getSchedule', () => {
    it('should return service data without DTO validation', async () => {
      const response = await controller.getSchedule(undefined);
      expect(response).toStrictEqual({ statusCode: 200, body: 'someData' });
    });

    it('should return validation errors', async () => {
      jest
        .spyOn(classValidatorMock, 'validate')
        .mockImplementationOnce(() => [
          { constraints: { id: 'some data was incorrect' } },
        ]);
      const response = await controller.getSchedule({ id: 'anything' as any });
      expect(response).toStrictEqual({
        statusCode: 400,
        body: { error: { message: 'some data was incorrect' } },
      });
    });

    it('should handle CustomError exception', async () => {
      jest
        .spyOn(scheduleServiceMock, 'getSchedule')
        .mockImplementationOnce(() => {
          throw new CustomError('Any Error', 404);
        });
      const response = await controller.getSchedule({ id: 'anything' as any });
      expect(response).toStrictEqual({
        statusCode: 404,
        body: { error: { message: 'Any Error', name: 'CustomError' } },
      });
    });
    it('should handle default exception', async () => {
      jest
        .spyOn(scheduleServiceMock, 'getSchedule')
        .mockImplementationOnce(() => {
          throw { any: 'error' };
        });
      const response = await controller.getSchedule({ id: 'anything' as any });
      expect(response).toStrictEqual({
        statusCode: 500,
        body: { error: { message: 'Internal Server Error', name: 'unknown' } },
      });
    });
  });
});
