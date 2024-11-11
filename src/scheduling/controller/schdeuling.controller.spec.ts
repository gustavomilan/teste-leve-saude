

const schedulingServiceMock = {
    postScheduling: jest.fn(() => 'someData'),
};

const classValidatorMock = {
    ...jest.requireActual('class-validator'),
    validate: jest.fn(() => []),
};

const classTransformerMock = {
    plainToInstance: jest.fn(),
    ...jest.requireActual('class-transformer'),
};

import { CustomError } from "../../utils/customError";
import { SchedulingController } from "./scheduling.controller";


jest.mock('../service/scheduling.service', () => {
    return{
        SchedulingService: jest.fn(() => schedulingServiceMock),
    };
});

jest.mock('class-validator', () => {
    return classValidatorMock;
});

describe('SchedulingController', () => {
    let controller: SchedulingController;

    beforeEach(() =>{
        controller = new SchedulingController();
        jest.clearAllMocks();
    });

    describe('postScheduling', () => {
        it('should handle default exception', async () => {
            jest
                .spyOn(schedulingServiceMock, 'postScheduling')
                .mockImplementationOnce(() => {
                throw { any: 'error' };
                });
            const responde = await controller.postScheduling({medico_id: 'anything' as any, paciente_nome: 'anything' as any, data_horario: 'anything' as any});
            expect(responde).toStrictEqual({ 
                statusCode: 500, 
                body: { error: { message: 'Internal Server Error', name: 'unknown' } }
            });
        });

        it('should return validantion errors', async () =>{
            jest
                .spyOn(classValidatorMock, 'validate')
                .mockImplementationOnce(() => [
                    { constrains : { medico_id: 'some data was incorrect'}},
                ]);
            const response = await controller.postScheduling({medico_id: 'incorret id' as any, paciente_nome:'test name', data_horario:'teste data'})
            expect(response).toStrictEqual({
                statusCode:400, 
                body: {error: {message: ''}}})
        })

        it('should return service data', async () => {
            const response = await controller.postScheduling({medico_id: 1, paciente_nome: 'Oracio', data_horario:'11.11.2024'});
            expect(response).toStrictEqual({statusCode: 201, body:'someData' })
        });

        it('should return CustomError', async () =>{
            jest
                .spyOn(schedulingServiceMock, 'postScheduling')
                .mockImplementationOnce(() => {
                    throw new CustomError('Any Error', 404);
                });
                const response = await controller.postScheduling({medico_id: 'anything' as any, paciente_nome : 'Oracio', data_horario: '11.11.2024'})
                expect(response).toStrictEqual({
                    statusCode: 404, body: 'Any Error'
                })
        })






    })
    

});