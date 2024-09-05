import prismaClient from "../../prisma";

interface FinishRequest {
    schedule_id: string;
    user_id: string;
}

class FinishScheduleService {
  async execute({ schedule_id, user_id }: FinishRequest) {

    if (schedule_id === '' || user_id === '') {
      throw new Error("Schedule id is required");
    }

    try{

        const belongsToUser = await prismaClient.service.findFirst({
            where: {
                id: schedule_id,
                user_id: user_id
            }
        });

        if (!belongsToUser) {
            throw new Error("This schedule does not belong to the user");
        }

        await prismaClient.service.delete({
            where: {
                id: schedule_id
            }
        });

        return { message: "Schedule finished successfully" };

    }catch (err){
      throw new Error(err);
    }
  }
}

export { FinishScheduleService };