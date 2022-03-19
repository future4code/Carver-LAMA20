import { AuthenticationData } from '../../../src/services/tokenGenerator';
import { USER_ROLES } from './../../../src/model/Band';

export class TokenGeneratorMock {
    public generate = (input: AuthenticationData): string => {
        return 'token_mock'
    }
     
    public verify(token: string) {
        return {
            id: 'id_mock',
            role: USER_ROLES.ADMIN
        }
  }
}
  
