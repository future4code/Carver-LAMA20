import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { User, stringToUserRole } from "../model/User";
import hashGenerator, { HashGenerator } from "../services/hashGenerator";
import idGenerator, { IdGenerator } from "../services/idGenerator";
import tokenGenerator, { TokenGenerator } from "../services/tokenGenerator";

export class UserBusiness {

   constructor(
      private idGenerator : IdGenerator,
      private hashGenerator : HashGenerator,
      private tokenGenerator : TokenGenerator,
      private userDatabase : UserDatabase
   ){

   }

   public async signup(
      name: string,
      email: string,
      password: string,
      role: string
   ) {
      try {
         if (!name || !email || !password || !role) {
            throw new CustomError(422, "Missing input");
         }

         if (email.indexOf("@") === -1) {
            throw new CustomError(422, "Invalid email");
         }

         if (password.length < 6) {
            throw new CustomError(422, "Invalid password");
         }

         const id = this.idGenerator.generate();

         const cypherPassword = await this.hashGenerator.hash(password);
         await this.userDatabase.createUser(
            new User(id, name, email, cypherPassword, stringToUserRole(role))
         );

         const accessToken = this.tokenGenerator.generate({
            id,
            role,
         });
         return { accessToken };
      } catch (error) {

         if (error instanceof Error) {
            if (error.message.includes("key 'email'")) {
               throw new CustomError(409, "Email already in use")
            }else{
               throw new CustomError(400,error.message)
            }
            
        } else {
         throw new CustomError(400,"signup error")
        }

      }

   }

   public async login(email: string, password: string) {

      try {
         if (!email || !password) {
            throw new CustomError(422, "Missing input");
         }
         const user = await this.userDatabase.getUserByEmail(email);

         if (!user) {
            throw new CustomError(401, "Invalid credentials");
         }

         const isPasswordCorrect = await this.hashGenerator.compareHash(
            password,
            user.getPassword()
         );

         if (!isPasswordCorrect) {
            throw new CustomError(401, "Invalid credentials");
         }

         const accessToken = this.tokenGenerator.generate({
            id: user.getId(),
            role: user.getRole(),
         });

         return { accessToken };
      } catch (error ) {
         if (error instanceof Error) {
            throw new CustomError(400,error.message);
        } else {
         throw new CustomError(400,"login error")
        }
      }
   }
}

export default new UserBusiness(
   new IdGenerator(),
   new HashGenerator(),
   new TokenGenerator(),
   new UserDatabase()
)