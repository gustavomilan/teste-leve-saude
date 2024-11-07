import { ScheduleController } from './schedule/controller/schedule.controller';
import { SchedulingController } from './scheduling/controller/scheduling.controller';
import { createLambdaResponse } from './utils/response';

class Container {
  async getSchedule({ queryStringParameters }) {
    const { body, statusCode } = await new ScheduleController().getSchedule(
      queryStringParameters,
    );
    // Utiliza a função createLambdaResponse para estruturar a resposta
    return createLambdaResponse(statusCode, body);
  }

  async postScheduling({ body }) {
    const { body: bodyController, statusCode } =
      await new SchedulingController().postScheduling(JSON.parse(body));
    // Resposta estruturada com createLambdaResponse
    return createLambdaResponse(statusCode, bodyController);
  }
}

// Exporta diretamente os métodos da instância de Container
export const { getSchedule, postScheduling } = new Container();
