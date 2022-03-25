import { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../errors/CustomError";
import { Band, PostInputBand } from "../model/Band";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private bandDatabase: BandDatabase

    ) {

    }

    public async register(
        input: PostInputBand, token: string
    ) {
        try {
            const { name, music_genre, responsible } = input
            if (!name || !music_genre || !responsible) {
                throw new CustomError(422, "Preencha todos os dados corretamente");
            }

            if (!token) {
                throw new Error("Por favor, insira um token")
            }
            const tokenValidation: any = this.tokenGenerator.verify(token)

            if (tokenValidation.role != "ADMIN") {
                throw new Error("Usuário não tem autorização para cadastrar bandas")
            }

            const dataBandsConsult:Band | undefined = await this.bandDatabase.getBandByName(name);

            if (dataBandsConsult){
                const bandName = dataBandsConsult.getName()
                if (bandName === name) {
                    throw new Error("Banda já registrada")
                }
            }
            
            const id = this.idGenerator.generate();

                     await this.bandDatabase.registerBand(
                        new Band(id, name, music_genre, responsible)
                     );

            return 'Banda registrada';
        } catch (error) {

            if (error instanceof Error) {
                    throw new CustomError(400, error.message)
            } else {
                throw new CustomError(400, "Erro ao registrar banda")
            }

        }

    }

    public async byName(
      name:string, token: string
    ) {
        try {
            if (!name) {
                throw new CustomError(422, "Preencha todos os dados corretamente");
            }

            if (!token) {
                throw new Error("Por favor, insira um token")
            }
            const tokenValidation: any = this.tokenGenerator.verify(token)

            const infoBand = (async ()=>{
               
                 const data =    await this.bandDatabase.getBandByName(name);
                 return data
                
            })

            const dataBand = await infoBand()

            if(!dataBand){
                throw new Error("Banda não encontrada")
            }

            return dataBand;
        } catch (error) {

            if (error instanceof Error) {
                    throw new CustomError(400, error.message)
            } else {
                throw new CustomError(400, "Erro ao coletar informações da banda")
            }

        }

    }

    public async byId(
         band_id: string, token: string
      ) {
          try {

              if (!band_id) {
                  throw new CustomError(422, "Preencha todos os dados corretamente");
              }
  
              if (!token) {
                  throw new Error("Por favor, insira um token")
              }
              const tokenValidation: any = this.tokenGenerator.verify(token)
  
              const infoBand = (async ()=>{
                const data =    await this.bandDatabase.getBandById(band_id);
                return data 
                  
              })
  
              const dataBand = await infoBand()
  
              if(!dataBand){
                  throw new Error("Banda não encontrada")
              }
  
              
      
  
              return dataBand;
          } catch (error) {
  
              if (error instanceof Error) {
                      throw new CustomError(400, error.message)
              } else {
                  throw new CustomError(400, "Erro ao coletar informações da banda")
              }
          }
      }
}

export default new BandBusiness(
    new IdGenerator(),
    new TokenGenerator(),
    new BandDatabase()
)