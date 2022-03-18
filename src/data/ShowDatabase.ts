import { CustomError } from './../errors/CustomError';
import BaseDataBase from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";
import { Show } from '../model/Show';

export class ShowDatabase extends BaseDataBase {

   protected tableName: string = "lama_shows";

   public async createShow(show: Show): Promise<void> {
      try {
         await BaseDataBase.connection.raw(`
            INSERT INTO ${this.tableName} (id, week_day, start_time, end_time, band_id)
            VALUES (
            '${show.getId()}', 
            '${show.getWeekDay()}', 
            '${show.getStartTime()}',
            '${show.getEndTime()}', 
            '${show.getBandId()}'
            )`
         );
      } catch (error) {
         if (error instanceof Error) {
           throw new Error(error.message) 
         }
         
      }
   }


   public async getShowsByDay(week_day: string): Promise<void> {
      try {
        const result = await BaseDataBase.connection.raw(`
         
         SELECT lama_bands.name,lama_bands.music_genre FROM ${this.tableName}
         JOIN lama_bands
         ON lama_shows.band_id = lama_bands.id
         WHERE week_day = "${week_day}"
         ORDER BY start_time;

      `);
      return result[0];
      } catch (error) {
         if (error instanceof Error) {
           throw new Error(error.message) 
         }
         
      }
   }

    public async getTimeShowsByDay(week_day: string): Promise<void|any> {
      try {
        const result = await BaseDataBase.connection.raw(`
         
         SELECT ${this.tableName}.start_time,${this.tableName}.end_time FROM ${this.tableName}
         WHERE week_day = "${week_day}"
         ;

      `);
      return result[0];
      } catch (error) {
         if (error instanceof Error) {
           throw new Error(error.message) 
         }
         
      }
   }

}