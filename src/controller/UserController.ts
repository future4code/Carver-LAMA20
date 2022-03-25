import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";

export class UserController {

   public async signup(req: Request, res: Response) {
      try {
         const { name, role, email, password } = req.body
         const result = await UserBusiness.signup(
            name,
            email,
            password,
            role
         );
         res.status(200).send(result);
      } catch (error) {
         
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "Algo deu errado ao cadastrar usuario" })
        }
      }
   }

   public async login(req: Request, res: Response) {
      try {
         const { email, password } = req.body
         const result = await UserBusiness.login(email, password);
         res.status(200).send(result);
      } catch (error) {
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "Algo deu errado ao logar usuario" })
        }
      }
   }
}

export default new UserController()