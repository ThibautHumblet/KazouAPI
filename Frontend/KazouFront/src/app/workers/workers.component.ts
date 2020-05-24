import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  data: JSON;
  loading: boolean;

  constructor(public http: Http) { }

  ngOnInit() {
    this.getWorkers();
  }

  getWorkers(): void {
    this.loading = true;
    this.http.request('https://localhost:44369/api/v1/workers')
    .subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
      console.log(this.data);
    });
  }

}
