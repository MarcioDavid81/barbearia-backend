import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserRequest {
    email: string;
    password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      },
      include: {
        subscriptions: true,
      }
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign({
      name: user.name,
      email: user.email
    }, 
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: "30d"
    }
  )

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      adress: user?.adress,
      phone: user?.phone,
      banner: user?.banner,
      token: token,
      subscriptions: user.subscriptions? {
        id: user?.subscriptions?.id,
        title: user?.subscriptions?.status,
      }: null
    }
  }
}

export { AuthUserService };