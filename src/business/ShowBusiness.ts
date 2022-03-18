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
                throw new CustomError(400, 'A início do seu show deve ser maior do que o final')
            }

            const tokenValidation: any = this.tokenGenerator.verify(token)

            const start = this.showTime.findIndex((hours) => hours === startTime)
            const end = this.showTime.findIndex((hours) => hours === endTime)

            if (start === -1 || end === -1) {
                throw new CustomError(400, 'Escolha um horário válido de 8 as 23 para o show')
            }
            const horaShows = await this.showDatabase.getTimeShowsByDay(weekDay)

            for (let showTime of horaShows) {

                for (var i = showTime.start_time; i < showTime.end_time; i++) {
                    if (startTime === i) {
                        throw new CustomError(400, 'seu horário inicial não pode ser agendado em horario ja ocupado')
                    }
                }

                const verifyEndTyme = showTime.start_time + 1

                for (var i = verifyEndTyme; i === showTime.end_time; i++) {
                    if (endTime === i) {
                        throw new CustomError(400, 'seu horário final não pode ser agendado em horario ja ocupado')
                    }
                }

                for (var X = startTime; X < endTime; X++) {
                    if (showTime.start_time === X) {
                        throw new CustomError(400, 'ha shows agendados entre os horários solicitados')
                    }
                }

                const verifyEndTyme2 = startTime + 1

                for (var X = verifyEndTyme2; X === endTime; X++) {
                    if (showTime.end_time === X) {
                        throw new CustomError(400, 'ha shows agendados entre os horários solicitados')
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
                throw new CustomError(422, "Preencha todos os dados corretamente");
            }

            if (week_day != "sexta" && week_day != "sabado" && week_day != "domingo") {
                throw new CustomError(422, "Dias dos shows são: sexta, sabado e domingo");
            }

            if (!token) {
                throw new Error("Por favor, insira um token")
            }
            const tokenValidation: any = this.tokenGenerator.verify(token)

            const dataShowsConsult: any | undefined = await this.showDatabase.getShowsByDay(week_day);

            if (!dataShowsConsult || dataShowsConsult.length === 0) {
                throw new Error("Nenhuma banda registrada nesse dia")
            }

            const id = this.idGenerator.generate();

            return dataShowsConsult;
        } catch (error) {

            if (error instanceof Error) {
                if (error.message.includes("key 'email'")) {
                    throw new CustomError(409, "Email já cadastrado")
                } else {
                    throw new CustomError(400, error.message)
                }

            } else {
                throw new CustomError(400, "Erro ao retornar shows do dia")
            }

        }

    }


}

export default new ShowBusiness(
    new IdGenerator(),
    new TokenGenerator(),
    new ShowDatabase()
)