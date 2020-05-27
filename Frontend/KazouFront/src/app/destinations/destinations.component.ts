import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AddDestinationInfo, EditDestinationInfo } from '../services/post-info';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  data: JSON;
  forecast: JSON;
  loading: boolean;
  isForecast: boolean;

  isAdding: boolean;
  isEditing: boolean;

  private addDestinationInfo: AddDestinationInfo;
  private editDestinationInfo: EditDestinationInfo;

  form: any = {};

  errorMessage = '';
  isPostFailed = false;

  constructor(public http: Http, public apiService: ApiService) { }

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

  getWeatherForecast(location: string) {
      this.http.request('http://api.weatherstack.com/current?access_key=5e3d8b4dc6bc192a256bf1c2328b1e07&query='+location)
      .subscribe((res: Response) => {
        this.forecast = res.json();
        this.isForecast = true;
        console.log(this.forecast);
      });
  }

  exit() {
    this.isAdding = false;
    this.isEditing = false;
    this.form = {};
    this.ngOnInit();
  }

  showSnackbar(snackbarName: string) {
    var x = document.getElementById(snackbarName);
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  addDestinationForm() {
    this.isAdding = true;
  }

  addDestination() {
    console.log(this.form)

    this.addDestinationInfo = new AddDestinationInfo(
      this.form.name,
      this.form.country,
      this.form.region
    )

    this.apiService.addDestination(this.addDestinationInfo).subscribe(data => {
      console.log(data);
      this.exit();
      this.showSnackbar("snackbarAdd")
    },
      error => {
        console.log(error);
        this.errorMessage = error.error.reason;
        this.isPostFailed = true;
      });
  }

  editForm(destinationID: number) {
    this.form.destinationID = destinationID;
    this.isEditing = true;
  }

  editDestination() {
    this.editDestinationInfo = new EditDestinationInfo(
      this.form.destinationID,
      this.form.name,
      this.form.country,
      this.form.region
    )

    this.apiService.editDestination(this.editDestinationInfo).subscribe(data => {
      console.log(data);
      this.exit();
      this.showSnackbar("snackbarEdit")
    },
      error => {
        console.log(error);
        this.errorMessage = error.error.reason;
        this.isPostFailed = true;
      });
  }

  deleteDestination(destinationID) {
    this.apiService.deleteDestination(destinationID).subscribe(data => {
      console.log(data);
      this.ngOnInit();
      this.showSnackbar("snackbarDelete");
    },
      error => {
        console.log(error);
        this.errorMessage = error.error.reason;
        this.isPostFailed = true;
      });
  }

}
