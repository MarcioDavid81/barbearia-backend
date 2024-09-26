import { Request, Response } from 'express';
import { DeleteHaircutService } from '../../services/haircut/DeleteHaircutService';

class DeleteHaircutController {
  async handle(request: Request, response: Response) {
    const { haircut_id } = request.query;

    const deleteHaircutService = new DeleteHaircutService();

    const haircut = await deleteHaircutService.execute({
      haircut_id: haircut_id as string,
    });

    return response.json(haircut);
  }
}

export { DeleteHaircutController };