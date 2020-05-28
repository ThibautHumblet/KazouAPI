import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../services/api.service';
import { AddProfileInfo, EditProfileInfo } from '../services/post-info';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  data: JSON;
  loading: boolean;

  isAdding: boolean;
  isEditing: boolean;

  private addProfileInfo: AddProfileInfo;
  private editProfileInfo: EditProfileInfo;

  form: any = {};

  errorMessage: JSON;
  isPostFailed = false;

  constructor(public http: Http, public apiService: ApiService) { }

  ngOnInit() {
    this.getProfiles();
  }

  getProfiles(): void {
    this.loading = true;
    this.http.request('https://kazouapi-1590156656031.ew.r.appspot.com/api/v1/profiles/')
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

  addProfileForm() {
    this.isAdding = true;
  }

  addProfile() {
    console.log(this.form)

    this.addProfileInfo = new AddProfileInfo(
      this.form.name,
      this.form.description
    )

    this.apiService.addProfile(this.addProfileInfo).subscribe(data => {
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

  editForm(profileID: number) {
    this.form.profileID = profileID;
    this.isEditing = true;
  }

  editProfile() {
    this.editProfileInfo = new EditProfileInfo(
      this.form.profileID,
      this.form.name,
      this.form.description
    )

    this.apiService.editProfile(this.editProfileInfo).subscribe(data => {
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

  deleteProfile(profileID) {
    this.apiService.deleteProfile(profileID).subscribe(data => {
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
