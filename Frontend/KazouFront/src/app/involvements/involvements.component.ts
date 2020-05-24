import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-involvements',
  templateUrl: './involvements.component.html',
  styleUrls: ['./involvements.component.css']
})
export class InvolvementsComponent implements OnInit {
  data: JSON;
  loading: boolean;

  constructor(public http: Http) { }

  ngOnInit() {
    this.getInvolvements();
  }

  getInvolvements(): void {
    this.loading = true;
    this.http.request('https://localhost:44369/api/v1/involvements')
    .subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
      console.log(this.data);
    });
  }


}
