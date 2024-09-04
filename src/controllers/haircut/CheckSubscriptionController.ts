import { Request, Response } from "express";
import { CheckSubsciptionService } from "../../services/haircut/CheckSubsciptionService";

class CheckSubscriptionController {
    async handle(request: Request, response: Response) {
        const user_id = request.user_id;

        const checkSubscription = new CheckSubsciptionService();

        const status = await checkSubscription.execute({
            user_id
        });

        return response.json(status);

    }
}

export { CheckSubscriptionController };