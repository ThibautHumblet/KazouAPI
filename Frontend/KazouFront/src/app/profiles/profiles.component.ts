import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  data: JSON;
  loading: boolean;

  constructor(public http: Http) { }

  ngOnInit() {
    this.getInvolvements();
  }

  getInvolvements(): void {
    this.loading = true;
    this.http.request('https://localhost:44369/api/v1/profiles')
    .subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
      console.log(this.data);
    });
  }
}
