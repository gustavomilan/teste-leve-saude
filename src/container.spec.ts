import { Container, getSchedule, postScheduling } from '../src/container'

const successResponse = {
    statusCode: 200,
    body: { any: 'any' },
};

const scheduleControllerMock = {
   getSchedule: jest.fn(() => successResponse),
};

const schedulingControllerMock = {
    postScheduling: jest.fn(() => successResponse),
 };


describe('Container', () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
        jest.clearAllMocks();
    })

    describe('getSchedule',() => {
        it('should call ScheduleController.getSchedule with the provided params', async () => {
            const params = { id: 1}
            const response = await getSchedule({
                queryStringParameters: params
            });

            expect(scheduleControllerMock.getSchedule).toHaveBeenCalledTimes(1)
            expect(scheduleControllerMock.getSchedule).toHaveBeenCalledWith(params)
            expect(response).toBe(successResponse)
        })
        
    })

    describe('postScheduling',() => {
        it('should call SchedulingController.postScheduling with the provided params', async () => {
            const params = { 
                medico_id: 1,
                paciente_nome: 'Paciente Teste',
                data_horario: '2024-10-05 09:00',   
            }

            const response = await postScheduling({
                body: params
            });

            expect(schedulingControllerMock.postScheduling).toHaveBeenCalledTimes(1)
            expect(schedulingControllerMock.postScheduling).toHaveBeenCalledWith(params)
            expect(response).toBe(successResponse)
        })
        
    })
})