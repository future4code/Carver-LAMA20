import { CustomError } from "../errors/CustomError";

export enum SHOW_DAYS {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export const stringToShow = (input: string): SHOW_DAYS => {
    switch (input) {
       case "FRIDAY":
          return SHOW_DAYS.FRIDAY;
       case "SATURDAY":
          return SHOW_DAYS.SATURDAY;
        case "SUNDAY":
            return SHOW_DAYS.SUNDAY
       default:
          throw new CustomError(422, "Apenas FRIDAY, SATURDAY, SUNDAY são dias de shows validos ");
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