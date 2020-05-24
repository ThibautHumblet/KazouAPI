import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { InvolvementsComponent } from './involvements/involvements.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { VacationsComponent } from './vacations/vacations.component';
import { WorkersComponent } from './workers/workers.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterGuardService } from './core/router-guard.service';


const routes: Routes = [
  { 
    path: 'index',
    component: IndexComponent
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  { 
    path: 'user-profile',
    component: UserProfileComponent
  },
  { 
    path: 'destinations',
    component: DestinationsComponent
  },
  { 
    path: 'involvements',
    component: InvolvementsComponent,
    canActivate: [RouterGuardService]
  },
  { 
    path: 'profiles',
    component: ProfilesComponent
  },
  { 
    path: 'vacations',
    component: VacationsComponent
  },
  { 
    path: 'workers',
    component: WorkersComponent,
    canActivate: [RouterGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
