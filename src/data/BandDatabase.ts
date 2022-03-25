import BaseDataBase from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDataBase {

   protected tableName: string = "lama_bands";

   private toModel(dbModel?: any): Band | undefined {
      return (
         dbModel &&
         new Band(
            dbModel.id,
            dbModel.name,
            dbModel.music_genre,
            dbModel.responsible
         )
      );
   }

   public async registerBand(band: Band): Promise<void> {
      try {
         await BaseDataBase.connection.raw(`
            INSERT INTO ${this.tableName} (id, name, music_genre, responsible)
            VALUES (
            '${band.getId()}', 
            '${band.getName()}', 
            '${band.getMusic_genre()}',
            '${band.getResponsible()}'
            )`
         );
      } catch (error) {
         if (error instanceof Error) {
           throw new Error(error.message) 
         }
         
      }
   }

   public async getBandById(id: string): Promise<Band | undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE id = '${id}'
         `);
         return this.toModel(result[0][0]);
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }

   public async getBandByName(name: string): Promise<Band | undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE name = '${name}'
         `);
         return this.toModel(result[0][0]);
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }

   public async getAllUsers(): Promise<User[]| undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName}
         `);
         return result[0].map((res: any) => {
            return this.toModel(res);
         });
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }
}