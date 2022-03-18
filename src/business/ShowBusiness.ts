import { SHOW_DAYS, stringToShow } from './../model/Show';
import { ShowDatabase } from "../data/ShowDatabase";
import { CustomError } from "../errors/CustomError";
import { Show } from "../model/Show";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class ShowBusiness {
    private showTime: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

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
        token?: string
    ) {
        try {
            if (!weekDay || !startTime || !endTime || !bandId) {
                throw new CustomError(422, "Preencha todos os dados corretamente")
            }

            if (!token) {
                throw new Error("Por favor, insira um token")
            }

            if (endTime <= startTime) {
                throw new CustomError(400, 'o início do seu show deve ser maior do que o final')
            }

            const tokenValidation: any = this.tokenGenerator.verify(token)

            if (tokenValidation.role !== "ADMIN") {
                throw new CustomError(403, "Desculpe,você não tem permissão para acessar essa área.")
            }

            const start = this.showTime.findIndex((hours) => hours === startTime)
            const end = this.showTime.findIndex((hours) => hours === endTime)

            if (start === -1 || end === -1) {
                throw new CustomError(400, 'Escolha um horário válido de 8 as 23 para o show')
            }
            const horaShows = await this.showDatabase.getTimeShowsByDay(weekDay)

            for (let showTime of horaShows) {
                for (var i = showTime.start_time; i < showTime.end_time; i++) {

                    if (startTime === i) {
                        throw new CustomError(400, 'já existe show cadastrado no horário deste dia')
                    }
                }
            }

            const id: string = this.idGenerator.generate();

            await this.showDatabase.createShow(
                new Show(id, stringToShow(weekDay), startTime, endTime, bandId)
            );

        } catch (error) {
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

            const dataShowsConsult: any | undefined = await this.showDatabase.getShowsByDay(week_day);

            if (!dataShowsConsult) {
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