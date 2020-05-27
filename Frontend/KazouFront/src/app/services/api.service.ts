import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddVacationInfo, EditVacationInfo } from './post-info';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  vacationUrl: string = "https://localhost:44369/api/v1/vacations"

  constructor(private http: HttpClient) { }

  addVacation(info: AddVacationInfo) {
    return this.http.post(this.vacationUrl, info)
  }

  editVacation(info: EditVacationInfo) {
    return this.http.put(this.vacationUrl, info)
  }

}