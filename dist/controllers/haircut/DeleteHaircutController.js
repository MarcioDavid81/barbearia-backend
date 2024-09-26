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
exports.DeleteHaircutController = void 0;
const DeleteHaircutService_1 = require("../../services/haircut/DeleteHaircutService");
class DeleteHaircutController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { haircut_id } = request.query;
            const deleteHaircutService = new DeleteHaircutService_1.DeleteHaircutService();
            const haircut = yield deleteHaircutService.execute({
                haircut_id: haircut_id,
            });
            return response.json(haircut);
        });
    }
}
exports.DeleteHaircutController = DeleteHaircutController;
