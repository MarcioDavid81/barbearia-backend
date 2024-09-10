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
exports.DetailHaircutController = void 0;
const DetailHaircutService_1 = require("../../services/haircut/DetailHaircutService");
class DetailHaircutController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const haircut_id = request.query.haircut_id;
            const detailHaircut = new DetailHaircutService_1.DetailHaircutService();
            const haircut = yield detailHaircut.execute({
                haircut_id
            });
            return response.json(haircut);
        });
    }
    ;
}
exports.DetailHaircutController = DetailHaircutController;
