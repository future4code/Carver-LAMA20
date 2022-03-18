import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import ShowBusiness from "../business/ShowBusiness";

export class ShowController {


   async createShow(req: Request, res: Response): Promise<void>{
      try{
         const {weekDay, startTime, endTime, bandId} = req.body
         let message = 'sucesso'
         const token = req.headers.authorization

         const result = await ShowBusiness.createShow  (
            weekDay,
            startTime,
            endTime,
            bandId,
            token
         );

         res.status(200).send({message})
         
      }catch(error){
         if(error instanceof Error){
            res.status(400).send(error.message)
         }else {
            res.send({message: "Algo deu errado em criar um show"})
         }

      }
   }

   public async in_day(req: Request, res: Response) {
      try {
         const week_day = req.body.week_day
         const token = req.headers.authorization as string

         const result = await ShowBusiness.showsInDay(
            week_day, token
         );
         res.status(200).send(result);
      } catch (error) {
         
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "showController error" })
        }
      }
   }

   public async info(req: Request, res: Response) {
      try {
         const name = req.body.name
         const band_id = req.params.id
         const token = req.headers.authorization as string

         const result = await BandBusiness.info(name,band_id, token);
         res.status(200).send(result);
      } catch (error) {
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "login error" })
        }
      }
   }

}

export default new ShowController()