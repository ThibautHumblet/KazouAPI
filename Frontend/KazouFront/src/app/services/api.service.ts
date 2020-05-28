import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddVacationInfo, EditVacationInfo, AddDestinationInfo, EditDestinationInfo,
          AddInvolvementInfo, EditInvolvementInfo, AddProfileInfo, EditProfileInfo } from './post-info';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  vacationUrl: string = "https://localhost:44369/api/v1/vacations/";
  destinationUrl: string = "https://localhost:44369/api/v1/destinations/";
  involvementUrl: string = "https://localhost:44369/api/v1/involvements/";
  profileUrl: string = "https://localhost:44369/api/v1/profiles/";

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

  addInvolvement(info: AddInvolvementInfo) {
    return this.http.post(this.involvementUrl, info);
  }

  editInvolvement(info: EditInvolvementInfo) {
    return this.http.put(this.involvementUrl, info);
  }

  deleteInvolvement(involvementID: number) {
    return this.http.delete(this.involvementUrl+involvementID);
  }

  addProfile(info: AddProfileInfo) {
    return this.http.post(this.profileUrl, info);
  }

  editProfile(info: EditProfileInfo) {
    return this.http.put(this.profileUrl, info);
  }

  deleteProfile(profileID: number) {
    return this.http.delete(this.profileUrl+profileID);
  }

}