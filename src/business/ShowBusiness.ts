import { SHOW_DAYS, stringToShow } from './../model/Show';
import { ShowDatabase } from "../data/ShowDatabase";
import { CustomError } from "../errors/CustomError";
import { Show } from "../model/Show";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class ShowBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private showDatabase: ShowDatabase

    ) {

    }

    async createShow(
        weekDay: SHOW_DAYS,
        startTime: number,
        endTime: number,
        bandId: string,
        token?:string
    ){
        try{
            if(!weekDay || !startTime || !endTime || !bandId){
                throw new CustomError(422, "Preencha todos os dados corretamente")
            }

            if (!token) {
                throw new Error("token não enviado")
            }

            const tokenValidation: any = this.tokenGenerator.verify(token)

            if (tokenValidation.role !== "ADMIN") {
                throw new CustomError(403, "You should be an ADMIN user to access")
            }
    
            const id: string = this.idGenerator.generate();

            await this.showDatabase.createShow(
                new Show(id, stringToShow(weekDay), startTime, endTime, bandId)
             );
             
        }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message) 
              }
              
        }
    }



























    public async showsInDay(
        week_day: string, token: string
    ) {
        try {
            
            if (!week_day) {
                throw new CustomError(422, "Missing input");
            }

            if (!token) {
                throw new Error("token não enviado")
            }
            const tokenValidation: any = this.tokenGenerator.verify(token)

            const dataShowsConsult:any | undefined = await this.showDatabase.getShowsByDay(week_day);

            if (!dataShowsConsult){
                    throw new Error("Nenhuma banda registrada nesse dia")
            }
            
            const id = this.idGenerator.generate();

            return dataShowsConsult;
        } catch (error) {

            if (error instanceof Error) {
                if (error.message.includes("key 'email'")) {
                    throw new CustomError(409, "Email already in use")
                } else {
                    throw new CustomError(400, error.message)
                }

            } else {
                throw new CustomError(400, "signup error")
            }

        }

    }


}

export default new ShowBusiness(
    new IdGenerator(),
    new TokenGenerator(),
    new ShowDatabase()
)