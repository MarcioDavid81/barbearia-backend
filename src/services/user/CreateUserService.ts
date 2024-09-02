import { response } from "express";
import prismaClient from "../../prisma"
import { hash } from "bcryptjs"


interface UserRequest{
    name: string;
    email: string;
    adress: string;
    phone: string;
    password: string;
    banner: string;
}

class CreateUserService{
    async execute({name, email, adress, phone, password, banner}: UserRequest){

        if(!email){
            throw new Error('Email incorreto');
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if(userAlreadyExists){
            throw new Error('Usuário já existe');
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                adress: adress,
                phone: phone,
                password: passwordHash,
                banner: banner
            },
            select:{
                id: true,
                name: true,
                email: true,
                adress: true,
                phone: true,
                banner: true
            }
        });
        
        return user;
    };
}

export { CreateUserService }