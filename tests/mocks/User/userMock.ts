import { USER_ROLES } from './../../../src/model/Band';
import { User } from './../../../src/model/User';

export const userMockADMIN = new User(
    "id_mockADMIN",
    "LarissaLa",
    "Larissa@Lanes1",
    "123456",
    USER_ROLES.ADMIN
)

export const userMockNORMAL = new User(
    "id_mockNORMAL",
    "LarissaNormal",
    "Larissa@Normal",
    "123456",
    USER_ROLES.NORMAL
)