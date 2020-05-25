import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {
  data: JSON;
  loading: boolean;
  sortURL: string;

  connectionString: string;

  constructor(public http: Http) { }

  ngOnInit() {
    this.getInvolvements();
  }

  getInvolvements() {
  this.callBackend("https://localhost:44369/api/v1/vacations")
  }

  callBackend(connectionString): void{
    this.data = null;
    this.loading = true;

    this.http.request(connectionString)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
        console.log(this.data);
      });
  }

  onChange(sortValue) {
    console.log(sortValue);
    switch (sortValue) {
      case "idFirst":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=vacationID&dir=asc"
        break;
      case "idLast":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=vacationID&dir=desc"
        break;
      case "nameAZ":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=name&dir=asc"
        break;
      case "nameZA":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=name&dir=desc"
        break;
      case "dateFirst":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=startdate&dir=asc"
        break;
      case "DateLast":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=startdate&dir=desc"
        break;

      default:
        break;
    }

    this.callBackend(this.sortURL);

  }
}
