import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
    data: JSON;
    loading: boolean;
  
    constructor(public http: Http) { }
  
    ngOnInit() {
      this.getDestinations();
    }
  
    getDestinations(): void {
      this.loading = true;
      this.http.request('https://localhost:44369/api/v1/destinations')
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
        console.log(this.data);
      });
    }

}
