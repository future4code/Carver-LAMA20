import { userMockADMIN, userMockNORMAL } from './userMock';
import { User } from "../../../src/model/User";

export class UserDataBaseMock{
    public async createUser(user: User): Promise<void> {
        
    }

    public async getUserByEmail(email: string): Promise<User | undefined>{
        if(email === 'Larissa@Lanes1'){
            return userMockADMIN
        }else if (email === 'Larissa@Normal'){
            return userMockNORMAL
        }else{
            undefined
        }
    }

    public async getUserById(id: string): Promise<User | undefined> {
        if(id === 'id_mockADMIN'){
            return userMockADMIN
        }else if (id === 'id_mockNORMAL'){
            return userMockNORMAL
        }else{
            undefined
        }
    }

    public async getAllUsers(): Promise<User[]| undefined> {
        return [userMockADMIN, userMockNORMAL]
    }
}