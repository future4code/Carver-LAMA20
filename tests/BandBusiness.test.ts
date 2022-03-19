import { BandDatabase } from './../src/data/BandDatabase';
import { BandDataBaseMock } from './mocks/Band/BandDataBaseMock';
import { TokenGeneratorMock } from './mocks/services/tokenGeneratorMock';
import { IdGeneratorMock } from './mocks/services/idGeneratorMock';
import { BandBusiness } from './../src/business/BandBusiness';


const bandBusinessMock = new BandBusiness(
    new IdGeneratorMock(),
    new TokenGeneratorMock(),
    new BandDataBaseMock() as BandDatabase
)

describe("Tests BandBusiness", () => {

    test("Retorna um erro caso não tenha algum dado no input ", async () => {
        expect.assertions(2);
        try{
           const accesToken = await bandBusinessMock.register("", "usuário1")
           expect(accesToken).toEqual({"accessToken": "token_mock"})

        }catch (e){
            expect(e.message).toEqual('Missing input')
            expect(e.statusCode).toBe(422)

        }
    })

    test("informe um id valido",async () => {
        expect.assertions(2)
        try{
            const accessToken = await bandBusinessMock.byId("id_mock1", "token")
            expect(accessToken).toEqual({"accessToken": "token_mock"})

        }catch (e){
            expect(e.message).toEqual('Missing input, name or id uninformed')
            expect(e.statusCode).toBe(422)
        }
    })

})