import { CustomError } from "../errors/CustomError";

export enum SHOW_DAYS {
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}

export const stringToShow = (input: string): SHOW_DAYS => {
    switch (input) {
       case "SEXTA":
          return SHOW_DAYS.SEXTA;
       case "SABADO":
          return SHOW_DAYS.SABADO;
        case "DOMINGO":
            return SHOW_DAYS.DOMINGO
       default:
          throw new CustomError(422, "Apenas SEXTA, SABADO, DOMINGO são dias de shows validos ");
    }
 };
 
export class Show{
    constructor(
        private id : string,
        private weekDay: SHOW_DAYS,
        private startTime : number,
        private endTime : number,
        private bandId: string
    ){}

    getId(): string{
        return this.id
    };

    getWeekDay(): SHOW_DAYS{
        return this.weekDay
    };

    getStartTime(): number{
        return this.startTime
    };

    getEndTime(): number{
        return this.endTime
    };


    getBandId(): string{
        return this.bandId
    };
}