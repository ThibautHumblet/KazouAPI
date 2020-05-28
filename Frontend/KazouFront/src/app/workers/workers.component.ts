import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { ApiService } from '../services/api.service';
import { EditWorkerInfo, AddWorkerInfo } from '../services/post-info';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  data: JSON;
  loading: boolean;

  isAdding: boolean;
  isEditing: boolean;

  private addWorkerInfo: AddWorkerInfo;
  private editWorkerInfo: EditWorkerInfo;

  form: any = {};

  errorMessage: JSON;
  isPostFailed = false;

  constructor(public http: Http, public apiService: ApiService) { }

  ngOnInit() {
    this.getWorkers();
  }

  getWorkers(): void {
    this.loading = true;
    this.http.request('https://kazouapi-1590156656031.ew.r.appspot.com/api/v1/workers/')
    .subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
      console.log(this.data);
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

  addWorkerForm() {
    this.isAdding = true;
  }

  addWorker() {
    console.log(this.form)

    this.addWorkerInfo = new AddWorkerInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.emailAddress,
      this.form.birthDay
    )

    this.apiService.addWorker(this.addWorkerInfo).subscribe(data => {
      console.log(data);
      this.isPostFailed = false;
      this.exit();
      this.showSnackbar("snackbarAdd")
    },
      error => {
        console.log(error);
        this.errorMessage = error.error.errors;
        this.isPostFailed = true;
      });
  }

  editForm(workerID: number) {
    this.form.workerID = workerID;
    this.isEditing = true;
  }

  editWorker() {
    this.editWorkerInfo = new EditWorkerInfo(
      this.form.workerID,
      this.form.firstName,
      this.form.lastName,
      this.form.emailAddress,
      this.form.birthDay
    )

    this.apiService.editWorker(this.editWorkerInfo).subscribe(data => {
      console.log(data);
      this.isPostFailed = false;
      this.exit();
      this.showSnackbar("snackbarEdit")
    },
      error => {
        console.log(error);
        this.errorMessage = error.error.errors;
        this.isPostFailed = true;
      });
  }

  deleteWorker(workerID) {
    this.apiService.deleteWorker(workerID).subscribe(data => {
      console.log(data);
      this.isPostFailed = false;
      this.ngOnInit();
      this.showSnackbar("snackbarDelete");
    },
      error => {
        console.log(error);
        this.errorMessage = error.error.errors;
        this.isPostFailed = true;
      });
  }

}
