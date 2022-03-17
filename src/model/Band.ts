import { CustomError } from "../errors/CustomError";

export class Band {
   constructor(
      private id: string,
      private name: string,
      private music_genre: string,
      private responsible: string,
   ) { }

   public getId(): string {
      return this.id;
   }

   public getName(): string {
      return this.name;
   }

   public getMusic_genre(): string {
      return this.music_genre;
   }

   public getResponsible(): string {
      return this.responsible;
   }

}

export const stringToUserRole = (input: string): USER_ROLES => {
   switch (input) {
      case "NORMAL":
         return USER_ROLES.NORMAL;
      case "ADMIN":
         return USER_ROLES.ADMIN;
      default:
         throw new CustomError(422, "Invalid user role");
   }
};

export enum USER_ROLES {
   NORMAL = "NORMAL",
   ADMIN = "ADMIN",
}


export type PostInputBand = {
    name: string
    music_genre: string
    responsible: string
    
}
