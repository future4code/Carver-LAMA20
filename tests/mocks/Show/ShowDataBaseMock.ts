import { showMockFRIDAY, showMockSATURDAY, showMockSUNDAY } from './showMock';
import { Show } from "../../../src/model/Show";


export class ShowDataBaseMock{

    public async createShow(show: Show): Promise<void>{
        
    }

    public async getShowsByDay(week_day: string): Promise<Show[] | undefined>{
        switch (week_day) {
            case "FRIDAY":
                return [showMockFRIDAY]
            case "SATURDAY":
                return [showMockSATURDAY]
            case "SUNDAY":
                return [showMockSUNDAY]
            default:
                return undefined
        }

    }

}