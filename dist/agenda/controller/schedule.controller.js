"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
const schedule_service_1 = require("../service/schedule.service");
const schedule_dto_1 = require("../dto/schedule.dto");
const customError_1 = require("../../utils/customError");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const response_1 = require("../../utils/response");
class ScheduleController {
    constructor() {
        this.scheduleService = new schedule_service_1.ScheduleService();
    }
    getSchedule(queryStringParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (queryStringParameters) {
                    const validationErrors = yield (0, class_validator_1.validate)((0, class_transformer_1.plainToInstance)(schedule_dto_1.ScheduleDTO, queryStringParameters));
                    if (validationErrors.length > 0) {
                        console.log(JSON.stringify(validationErrors, null, 4));
                        return {
                            statusCode: 400,
                            body: { error: { message: validationErrors.join('\n'),
                                } }
                        };
                    }
                }
                const body = this.scheduleService.getSchedule(queryStringParameters);
                return (0, response_1.createControllerResponse)(200, body);
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return {
                        statusCode: error.statusCode,
                        body: {
                            error: {
                                message: error.message,
                                name: error.name,
                            }
                        }
                    };
                }
            }
            return {
                statusCode: 500,
                body: {
                    error: {
                        message: "Internal Server Error",
                        name: 'unknown'
                    }
                }
            };
        });
    }
}
exports.ScheduleController = ScheduleController;
