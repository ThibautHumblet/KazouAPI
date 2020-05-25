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

  constructor(public http: Http) { }

  ngOnInit() {
    this.getInvolvements();
  }

  getInvolvements(): void {
    this.loading = true;
    this.http.request('https://localhost:44369/api/v1/vacations')
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
        console.log(this.data);
      });
  }

  onChange(sortValue) {
    console.log(sortValue);
    switch (sortValue) {
      case "naamAZ":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=name&dir=asc"
        break;
      case "naamZA":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=name&dir=desc"
        break;
      case "datumEerst":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=startdate&dir=asc"
        break;
      case "datumLaatst":
        this.sortURL = "https://localhost:44369/api/v1/vacations?sort=startdate&dir=desc"
        break;

      default:
        break;
    }

    this.data= null;

    this.loading = true;
    this.http.request(this.sortURL)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
        console.log(this.data);
      });
  }
}
