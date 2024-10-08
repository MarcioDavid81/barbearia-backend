import { Request, Response } from "express";
import { NewScheduleService } from "../../services/schedule/NewScheduleService";

class NewScheduleController {
    async handle(request: Request, response: Response) {
        const { haircut_id, costumer, start, end } = request.body;
        const user_id = request.user_id;

        const newSchedule = new NewScheduleService();

        const schedule = await newSchedule.execute({
            user_id,
            haircut_id,
            costumer,
            start,
            end
        });

        return response.json(schedule);
    }

}

export { NewScheduleController }