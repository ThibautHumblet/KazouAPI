import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UniquePipe } from '../pipes/unique.pipe'

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

  constructor(public http: Http) { }

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
    if (this.noFilter) {
      this.pageChar = "?"
    } else {
      this.pageChar = "&"
    }
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
        this.vacationNames = [...new Set(this.vacationNames.map(item => item.name))];
        console.log(this.vacationNames)
      });
  }

  searchField(property) {
    switch (property) {
      case "name":
        this.nameSelected = true;
        this.dateSelected = false;
        this.destinationIDSelected = false;
        break;
      case "startdate":
        this.nameSelected = false;
        this.dateSelected = true;
        this.destinationIDSelected = false;
        break;
      case "destinationID":
        this.nameSelected = false;
        this.dateSelected = false;
        this.destinationIDSelected = true;
        break;
      default:
        break;
    }
  }

}