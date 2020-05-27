export class AddVacationInfo {
    name: string;
    destinationID: number;
    startDate: Date;
    endDate: Date

    constructor(name: string, destinationID: number, startDate: Date, endDate: Date) {
        this.name = name;
        this.destinationID = destinationID;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}