import { bandMock1, bandMock2, bandMock3 } from './BandMock';
import { Band } from "../../../src/model/Band";


export class BandDataBaseMock{
    public async registerBand(band: Band): Promise<void> {

    }


    public async getBandById(id: string): Promise<Band | undefined> {
        if(id === "id_mock1"){
            return bandMock1
        }else if(id === "id_mock2"){
            return bandMock2
        }else if(id === "id_mock3"){
            return bandMock3
        }else{
            return undefined
        }

    }
}