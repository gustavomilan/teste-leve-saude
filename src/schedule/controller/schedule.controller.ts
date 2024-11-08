import { ScheduleResource } from '../interface/schedule.interface';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleDTO } from '../dto/schedule.dto';
import { CustomError } from '../../utils/customError';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { createControllerResponse } from '../../utils/response';
import {
  LambdaError,
  LambdaResponse,
} from '../../utils/lambdaResponse.interface';

export class ScheduleController {
  // Define a instância ScheduleService como readonly para garantir que ela não será reatribuída
  private readonly scheduleService: ScheduleService;

  constructor() {
    this.scheduleService = new ScheduleService();
  }

  // Tipagem explícita dos parâmetros e do retorno da função para garantir consistência
  async getSchedule(
    queryStringParameters: ScheduleDTO,
  ): Promise<LambdaResponse<ScheduleResource | LambdaError>> {
    try {
      // Validação do DTO de entrada, convertendo e verificando erros
      if (queryStringParameters) {
        const validationErrors = await validate(
          plainToInstance(ScheduleDTO, queryStringParameters),
        );

        // Caso existam erros de validação, retornar erro com status 400
        if (validationErrors.length > 0) {
          // Exibirá as mensagens configuradas no DTO
          const body = {
            error: {
              message: validationErrors
                .map((err) => Object.values(err.constraints))
                .join(', '),
            },
          };
          return createControllerResponse(400, body);
        }
      }

      // Chama o serviço para obter o agendamento e cria a resposta
      const body = this.scheduleService.getSchedule(queryStringParameters);
      return createControllerResponse(200, body);
    } catch (error) {
      // Tratamento de erro específico para CustomError
      if (error instanceof CustomError) {
        return {
          statusCode: error.statusCode,
          body: {
            error: {
              message: error.message,
              name: error.name,
            },
          },
        };
      }
    }

    // Resposta padrão para erro de exceção
    return {
      statusCode: 500,
      body: {
        error: {
          message: 'Internal Server Error',
          name: 'unknown',
        },
      },
    };
  }
}
