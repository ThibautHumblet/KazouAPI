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

export class AddInvolvementInfo {
    vacationID: number;
    workerID: number;
    profileID: number

    constructor(vacationID: number, workerID: number, profileID: number) {
        this.vacationID = vacationID;
        this.workerID = workerID;
        this.profileID = profileID;
    }
}

export class EditInvolvementInfo {
    involvementID: number;
    vacationID: number;
    workerID: number;
    profileID: number

    constructor(involvementID: number, vacationID: number, workerID: number, profileID: number) {
        this.involvementID = involvementID;
        this.vacationID = vacationID;
        this.workerID = workerID;
        this.profileID = profileID;
    }
}

export class AddProfileInfo {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export class EditProfileInfo {
    profileID: number;
    name: string;
    description: string;

    constructor(profileID: number, name: string, description: string) {
        this.profileID = profileID;
        this.name = name;
        this.description = description;
    }
}