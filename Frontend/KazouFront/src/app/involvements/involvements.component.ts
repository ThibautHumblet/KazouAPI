import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../services/api.service';
import { EditInvolvementInfo, AddInvolvementInfo } from '../services/post-info';

@Component({
  selector: 'app-involvements',
  templateUrl: './involvements.component.html',
  styleUrls: ['./involvements.component.css']
})
export class InvolvementsComponent implements OnInit {
  data: JSON;
  loading: boolean;

  isAdding: boolean;
  isEditing: boolean;

  private addInvolvementInfo: AddInvolvementInfo;
  private editInvolvementInfo: EditInvolvementInfo;

  form: any = {};

  errorMessage: JSON;
  isPostFailed = false;

  constructor(public http: Http, public apiService: ApiService) { }

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

  addInvolvementForm() {
    this.isAdding = true;
  }

  addInvolvement() {
    console.log(this.form)

    this.addInvolvementInfo = new AddInvolvementInfo(
      this.form.vacationID,
      this.form.workerID,
      this.form.profileID
    )

    this.apiService.addInvolvement(this.addInvolvementInfo).subscribe(data => {
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

  editForm(involvementID: number) {
    this.form.involvementID = involvementID;
    this.isEditing = true;
  }

  editInvolvement() {
    this.editInvolvementInfo = new EditInvolvementInfo(
      this.form.involvementID,
      this.form.vacationID,
      this.form.workerID,
      this.form.profileID
    )

    this.apiService.editInvolvement(this.editInvolvementInfo).subscribe(data => {
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

  deleteInvolvement(involvementID) {
    this.apiService.deleteInvolvement(involvementID).subscribe(data => {
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
