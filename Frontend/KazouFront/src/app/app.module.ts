import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

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

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

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
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
