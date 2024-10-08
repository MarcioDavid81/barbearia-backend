import prismaClient from "../../prisma";

interface NewScheduleRequest{
  user_id: string;
  haircut_id: string;
  costumer: string;
  start: string;
  end: string;
}

class NewScheduleService{
  async execute({ user_id, haircut_id, costumer, start, end }: NewScheduleRequest){

    if(costumer === '' || haircut_id === ''){
      throw new Error("Error schedule new service.")
    }

    const schedule = await prismaClient.service.create({
      data:{
        costumer,
        haircut_id,
        user_id,
        start: new Date(start),
        end: new Date(end)
      }
    })

    return schedule;

  }
}

export { NewScheduleService }