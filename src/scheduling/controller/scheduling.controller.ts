import { CreatingSchedulingDTO } from '../dto/scheduling.dto';
import { SchedulingService } from '../service/scheduling.service';
import { SchedulingResponse } from '../interface/scheduling.interface';
import { CustomError } from '../../utils/customError';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  LambdaError,
  LambdaResponse,
} from '../../utils/lambdaResponse.interface';
import { createControllerResponse } from '../../utils/response';

export class SchedulingController {
  private readonly schedulingService: SchedulingService;

  constructor() {
    this.schedulingService = new SchedulingService();
  }

  async postScheduling(
    bodyParameters: CreatingSchedulingDTO,
  ): Promise<LambdaResponse<SchedulingResponse | LambdaError>> {
    try {
      // Validação do DTO, com captura de erros específicos
      const dtoErrors = await validate(
        plainToInstance(CreatingSchedulingDTO, bodyParameters),
      );

      // Verifica se há erros de validação
      if (dtoErrors.length > 0) {
        // Concatena as mensagens de erro detalhadas para retornar ao usuário
        const validationMessages = dtoErrors
          .map((error) => Object.values(error.constraints || {}).join(', '))
          .join('; ');

        const body = { error: { message: validationMessages } };
        return createControllerResponse(400, body);
      }

      // Chamada ao serviço com o DTO validado
      const bodyResponse =
        this.schedulingService.postScheduling(bodyParameters);

      // Retorna resposta com status 201
      return createControllerResponse(201, bodyResponse);
    } catch (error) {
      // Vai verificar se algum CustomErros foi chamado no Service
      if (error instanceof CustomError) {
        return createControllerResponse(error.statusCode, error.message);
      }

      // Resposta padrão para erro interno de servidor
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
}
