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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.postScheduling = exports.getSchedule = void 0;
const schedule_controller_1 = require("./agenda/controller/schedule.controller");
const scheduling_controller_1 = require("./agendamento/controller/scheduling.controller");
const response_1 = require("./utils/response");
class Container {
    getSchedule(_a) {
        return __awaiter(this, arguments, void 0, function* ({ queryStringParameters }) {
            const { body, statusCode } = yield new schedule_controller_1.ScheduleController().getSchedule(queryStringParameters);
            return (0, response_1.createLambdaResponse)(statusCode, body);
        });
    }
    postScheduling(_a) {
        return __awaiter(this, arguments, void 0, function* ({ body }) {
            const { body: bodyController, statusCode } = yield new scheduling_controller_1.SchedulingController().postScheduling(JSON.parse(body));
            return (0, response_1.createLambdaResponse)(statusCode, bodyController);
        });
    }
}
_a = new Container(), exports.getSchedule = _a.getSchedule, exports.postScheduling = _a.postScheduling;
