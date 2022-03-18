import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import UserBusiness from "../business/UserBusiness";
import { PostInputBand } from "../model/Band";

export class BandController {

   public async register(req: Request, res: Response) {
      try {
         const { name, music_genre, responsible } = req.body
         const token = req.headers.authorization as string

         const input: PostInputBand = {
            name,
            music_genre,
            responsible
        }

         const result = await BandBusiness.register(
            input, token
         );
         res.status(200).send(result);
      } catch (error) {
         
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "register error" })
        }
      }
   }

   public async byName(req: Request, res: Response) {
      try {
         const name = req.body.name
         const token = req.headers.authorization as string

         const result = await BandBusiness.byName(name, token);
         res.status(200).send(result);
      } catch (error) {
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "controller error" })
        }
      }
   }

   public async byId(req: Request, res: Response) {
      try {
         const band_id = req.params.id
         const token = req.headers.authorization as string

         const result = await BandBusiness.byId(band_id, token);
         res.status(200).send(result);
      } catch (error) {
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "controller error" })
        }
      }
   }
}

export default new BandController()