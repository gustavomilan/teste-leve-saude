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
exports.SchedulingController = void 0;
const scheduling_dto_1 = require("../dto/scheduling.dto");
const scheduling_service_1 = require("../service/scheduling.service");
const customError_1 = require("../../utils/customError");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const response_1 = require("../../utils/response");
class SchedulingController {
    constructor() {
        this.schedulingService = new scheduling_service_1.SchedulingService();
    }
    postScheduling(bodyParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = yield (0, class_validator_1.validate)((0, class_transformer_1.plainToInstance)(scheduling_dto_1.CreatingSchedulingDTO, bodyParameters));
                if (dto.length > 0) {
                    return {
                        statusCode: 400,
                        body: { error: { message: "Dados passados incorretamente" } }
                    };
                }
                const bodyResponse = this.schedulingService.postScheduling(bodyParameters);
                return (0, response_1.createControllerResponse)(201, bodyResponse);
            }
            catch (error) {
                console.error("Erro capturado no Controller:", error);
                console.error("Erro capturado no Body:", bodyParameters);
                if (error instanceof customError_1.CustomError) {
                    return {
                        statusCode: error.statusCode,
                        body: {
                            error: {
                                message: error.message,
                                name: error.name
                            }
                        }
                    };
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
            }
        });
    }
}
exports.SchedulingController = SchedulingController;
