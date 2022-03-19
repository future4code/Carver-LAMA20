import { ShowBusiness } from './../src/business/ShowBusiness';
import { IdGeneratorMock } from './mocks/services/idGeneratorMock';
import { TokenGeneratorMock } from './mocks/services/tokenGeneratorMock';
import { ShowDataBaseMock } from './mocks/Show/ShowDataBaseMock';

const showBusinessMock = new ShowBusiness(
    new IdGeneratorMock(),
    new TokenGeneratorMock(), 
    new ShowDataBaseMock() as any
)

describe("Tests ShowBusiness", () => {

    test("Error caso o weekDay esteja vazio", async () => {
        expect.assertions(2);
        try{
            const accessToken = await showBusinessMock.createShow("", "", "", "" )
            expect(accessToken).toEqual({"accessToken": "token_mock"})
        }catch(e){
            expect(e.message).toEqual("Preencha todos os dados corretamente")
            expect(e.statusCode).toBe(400)
        }
    })
})