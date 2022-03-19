import { UserBusiness } from '../src/business/UserBusiness';
import { HashGeneratorMock } from './mocks/services/hashManagerMock';
import { IdGeneratorMock } from './mocks/services/idGeneratorMock';
import { TokenGeneratorMock } from './mocks/services/tokenGeneratorMock';
import { UserDataBaseMock } from './mocks/User/UserDataBaseMock';


const userBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashGeneratorMock(),
    new TokenGeneratorMock(), 
    new UserDataBaseMock() as any
)

describe('Tests signup', () => {
    
    test('Error que retorna caso o nome esteja vazio', async () => {
        expect.assertions(2);
        try{
            await userBusinessMock.signup("", "Larissa@Lanes", "123456", "ADMIN")
        }catch(e){
            expect(e.message).toEqual('Missing input')
            expect(e.statusCode).toBe(400)
        }
    })

    test('Error se o email for iválido', async() => {
        try{
            await userBusinessMock.signup("Larissa", "LarissaLanes" ,"123456", "NORMAL")
        }catch(e){
            expect(e.message).toEqual('Invalid email')
            expect(e.statusCode).toBe(400)
        }
    })

    test('Error de password', async() => {
        try{
            await userBusinessMock.signup("Laboot", "Laboot@", "111111111111", "NORMAL")
        }catch(e){
            expect(e.message).toEqual('Invalid password')
            expect(e.statusCode).toBe(400)
        }
    })


    



})