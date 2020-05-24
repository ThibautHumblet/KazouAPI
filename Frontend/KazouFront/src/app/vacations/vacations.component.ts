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
}
