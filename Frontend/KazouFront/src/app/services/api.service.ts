import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddVacationInfo, EditVacationInfo, AddDestinationInfo, EditDestinationInfo } from './post-info';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  vacationUrl: string = "https://localhost:44369/api/v1/vacations/";
  destinationUrl: string = "https://localhost:44369/api/v1/destinations/";

  constructor(private http: HttpClient) { }

  addVacation(info: AddVacationInfo) {
    return this.http.post(this.vacationUrl, info);
  }

  editVacation(info: EditVacationInfo) {
    return this.http.put(this.vacationUrl, info);
  }

  deleteVacation(VacationID: number) {
    return this.http.delete(this.vacationUrl+VacationID);
  }

  addDestination(info: AddDestinationInfo) {
    return this.http.post(this.destinationUrl, info);
  }

  editDestination(info: EditDestinationInfo) {
    return this.http.put(this.destinationUrl, info);
  }

  deleteDestination(destinationID: number) {
    return this.http.delete(this.destinationUrl+destinationID);
  }

}