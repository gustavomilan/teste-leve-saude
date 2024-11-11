import { CustomError } from '../../utils/customError';
import { ScheduleService } from './schedule.service';
import { appointmentMock } from '../mocks/schedule.mock';

describe('ScheduleService', () => {
    let service: ScheduleService;

    beforeEach(() => {
        service = new ScheduleService();
        jest.clearAllMocks();
    })

    describe('getSchedule', () => {
        it('should return all medics when no ID is provided', () => {
            const response =  service.getSchedule({});
            expect(response).toEqual(appointmentMock);
        })

        it(' should return CustomError because dont find any medic ', () => {
            const response = { id: 9999 };
            expect(() => { service.getSchedule(response)
              }).toThrow(new CustomError('Médico não encontrado', 404))

        })

        it('should return a specific medic when ID is provided and found', () => {
            const response = { id: 1 };
            const expectedMedic = appointmentMock.medicos.find(
                (medic) => medic.id === Number(response.id)
              );

            const result = service.getSchedule(response);
            expect(result).toEqual({ medicos: [expectedMedic] });
        })

        
   })
})