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
          throw new CustomError(422, "Invalid SHOW_DAYS");
    }
 };
 

export interface ShowInputDTO {
    weekDay: SHOW_DAYS | undefined,
    startTime: number | undefined,
    endTime: number | undefined,
    bandId: string | undefined
}

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