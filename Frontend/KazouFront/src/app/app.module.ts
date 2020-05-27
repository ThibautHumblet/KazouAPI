import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { InvolvementsComponent } from './involvements/involvements.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { VacationsComponent } from './vacations/vacations.component';
import { WorkersComponent } from './workers/workers.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { RouterGuardService } from './core/router-guard.service';

import { AuthService } from './core/auth.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    DestinationsComponent,
    InvolvementsComponent,
    ProfilesComponent,
    VacationsComponent,
    WorkersComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
