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
exports.CheckSubscriptionController = void 0;
const CheckSubsciptionService_1 = require("../../services/haircut/CheckSubsciptionService");
class CheckSubscriptionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = request.user_id;
            const checkSubscription = new CheckSubsciptionService_1.CheckSubsciptionService();
            const status = yield checkSubscription.execute({
                user_id
            });
            return response.json(status);
        });
    }
}
exports.CheckSubscriptionController = CheckSubscriptionController;
