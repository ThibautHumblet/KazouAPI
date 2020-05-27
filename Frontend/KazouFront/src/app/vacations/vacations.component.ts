import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../services/api.service';
import { AddVacationInfo } from '../services/post-info';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {
  data: JSON;
  loading: boolean;
  sortURL: string;
  baseUrl: string = "https://localhost:44369/api/v1/vacations";
  lastUrl: string = this.baseUrl;
  pageLengthUrl: string;
  fullPageLengthUrl: string = "";
  currentPage: number = 0;
  itemsPerPage: string;

  vacationNames: string[];

  connectionString: string;
  pagingString: string;

  noFilter: boolean = true;
  pageChar: string;

  nameSelected: boolean = true;
  dateSelected: boolean;
  destinationIDSelected: boolean;

  searchby: string;
  searchparam: string;
  searchbyUrl: string = "?name=";
  searchparamUrl: string;
  searchUrl: string;

  searchByID: boolean;

  isAdding: boolean;
  private addVacationInfo: AddVacationInfo;
  form: any = {};

  errorMessage = '';
  isPostFailed = false;

  constructor(private apiService: ApiService, private http: Http) { }

  ngOnInit() {
    this.getVacationNames();
    this.getInvolvements();
  }

  getInvolvements() {
    this.callBackend(this.baseUrl)

  }

  callBackend(connectionString): void {
    this.data = null;
    this.loading = true;

    this.lastUrl = connectionString;
    console.log(connectionString + this.fullPageLengthUrl)
    this.http.request(connectionString + this.fullPageLengthUrl)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
        console.log(this.data);
      });
  }

  checkChar() {
    if (this.noFilter) {
      this.pageChar = "?"
    } else {
      this.pageChar = "&"
    }
  }

  onChange(sortValue) {
    console.log(sortValue);
    switch (sortValue) {
      case "idFirst":
        this.sortURL = "?sort=vacationID&dir=asc"
        break;
      case "idLast":
        this.sortURL = "?sort=vacationID&dir=desc"
        break;
      case "nameAZ":
        this.sortURL = "?sort=name&dir=asc"
        break;
      case "nameZA":
        this.sortURL = "?sort=name&dir=desc"
        break;
      case "dateFirst":
        this.sortURL = "?sort=startdate&dir=asc"
        break;
      case "dateLast":
        this.sortURL = "?sort=startdate&dir=desc"
        break;

      default:
        break;
    }

    this.callBackend(this.baseUrl + this.sortURL);
    console.log(this.baseUrl + this.sortURL);

    this.noFilter = false;

  }

  paging(pageValue) {
    console.log(pageValue);

    this.checkChar();

    switch (pageValue) {
      case "5":
        this.pageLengthUrl = "&pageLength=5"
        this.itemsPerPage = "5";
        break;
      case "10":
        this.pageLengthUrl = "&pageLength=10"
        this.itemsPerPage = "10";
        break;
      case "25":
        this.pageLengthUrl = "&pageLength=25"
        this.itemsPerPage = "25";
        break;
      case "50":
        this.pageLengthUrl = "&pageLength=50"
        this.itemsPerPage = "50";
        break;

      default:
        this.pageLengthUrl = "&pageLength=5"
        this.itemsPerPage = "5";
        break;
    }

    this.fullPageLengthUrl = this.pageChar + "page=" + this.currentPage + this.pageLengthUrl;

    this.callBackend(this.lastUrl);
  }

  pageUp() {
    console.log("Page Up");
    console.log(this.itemsPerPage);
    this.currentPage++;
    this.paging(this.itemsPerPage);
  }

  pageDown() {
    console.log("Page Down");
    if (this.currentPage >= 1) {
      this.currentPage--;
      this.paging(this.itemsPerPage);
    }
  }

  getVacationNames() {
    this.itemsPerPage = "10000";

    this.vacationNames = null;
    this.loading = true;

    this.http.request(this.baseUrl + "?pageLength=10000")
      .subscribe((res: Response) => {
        this.vacationNames = res.json();
        this.loading = false;
        //this.vacationNames = [...new Set(this.vacationNames.map(item => item.name))]; // <==== DIT WERKT NOG NIET NAAR BEHOREN
        console.log(this.vacationNames)
      });
  }

  searchField(property) {
    switch (property) {
      case "name":
        this.nameSelected = true;
        this.dateSelected = false;
        this.destinationIDSelected = false;
        this.searchbyUrl = "?name=";
        break;
      case "startdate":
        this.nameSelected = false;
        this.dateSelected = true;
        this.destinationIDSelected = false;
        this.searchbyUrl = "?startDate=";
        break;
      case "destinationID":
        this.nameSelected = false;
        this.dateSelected = false;
        this.destinationIDSelected = true;
        this.searchbyUrl = "?destinationID=";
        break;
      default:
        break;
    }
    console.log(this.searchbyUrl);
    this.noFilter = false;
  }

  search() {
    this.checkChar();
    this.searchparamUrl = ((<HTMLInputElement>document.getElementById("searchparam")).value);
    this.searchUrl = this.baseUrl + this.searchbyUrl + this.searchparamUrl
    this.callBackend(this.searchUrl);
    this.lastUrl = this.searchUrl;
    this.noFilter = false;
  }

  searchById() {
    this.searchparamUrl = ((<HTMLInputElement>document.getElementById("searchByIdParam")).value);

    this.data = null;
    this.loading = true;

    this.http.request(this.baseUrl+'/'+this.searchparamUrl)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
        console.log(this.data);
      });
      this.searchByID= true
  }

  resetById() {
    this.searchByID = false;
    (<HTMLInputElement>document.getElementById("searchByIdParam")).value = null;
    this.callBackend(this.lastUrl);
  }

  delete(deleteID) {
    this.http.delete(this.baseUrl+'/'+deleteID)
    .subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
      this.ngOnInit();
      this.showSnackbar("snackbarDelete");
    });
  }

  showSnackbar(snackbarName: string) {
    var x = document.getElementById(snackbarName);
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  addVacationForm() {
    this.isAdding = true;
  }

  addVacation(){
    console.log(this.form)

    this.addVacationInfo = new AddVacationInfo(
      this.form.name,
      this.form.destinationID,
      this.form.startDate,
      this.form.endDate
    )

    this.apiService.addVacation(this.addVacationInfo).subscribe(data => {
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

  exit() {
    this.isAdding = false;
  }

}