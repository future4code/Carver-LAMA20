import BaseDataBase from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";

export class ShowDatabase extends BaseDataBase {

   protected tableName: string = "lama_shows";

   public async getShowsByDay(week_day: string): Promise<void> {
      try {
        const result = await BaseDataBase.connection.raw(`
         
         SELECT * FROM ${this.tableName}
         JOIN lama_bands
         WHERE week_day = '${week_day}
         ORDER BY start_time;

      `);
      return result;
      } catch (error) {
         if (error instanceof Error) {
           throw new Error(error.message) 
         }
         
      }
   }

}