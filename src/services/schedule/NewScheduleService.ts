import prismaClient from "../../prisma";

interface NewScheduleRequest{
  user_id: string;
  haircut_id: string;
  costumer: string;
}

class NewScheduleService{
  async execute({ user_id, haircut_id, costumer }: NewScheduleRequest){

    if(costumer === '' || haircut_id === ''){
      throw new Error("Error schedule new service.")
    }

    const schedule = await prismaClient.service.create({
      data:{
        costumer,
        haircut_id,
        user_id
      }
    })

    return schedule;

  }
}

export { NewScheduleService }