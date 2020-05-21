import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { InvolvementsComponent } from './involvements/involvements.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { VacationsComponent } from './vacations/vacations.component';
import { WorkersComponent } from './workers/workers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    LoginComponent,
    DestinationsComponent,
    InvolvementsComponent,
    ProfilesComponent,
    VacationsComponent,
    WorkersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
