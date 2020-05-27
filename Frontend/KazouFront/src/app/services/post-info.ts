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

export class AddDestinationInfo {
    name: string;
    country: string;
    region: string

    constructor(name: string, country: string, region: string) {
        this.name = name;
        this.country = country;
        this.region = region;
    }
}

export class EditDestinationInfo {
    destinationID: number;
    name: string;
    country: string;
    region: string

    constructor(destinationID: number, name: string, country: string, region: string) {
        this.destinationID = destinationID;
        this.name = name;
        this.country = country;
        this.region = region;
    }
}