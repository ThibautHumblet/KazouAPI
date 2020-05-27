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

export class EditVacationInfo {
    vacationID: number
    name: string;
    destinationID: number;
    startDate: Date;
    endDate: Date

    constructor(vacationID: number, name: string, destinationID: number, startDate: Date, endDate: Date) {
        this.vacationID = vacationID;
        this.name = name;
        this.destinationID = destinationID;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}