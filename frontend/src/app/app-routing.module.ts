import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';

const FULL = 'full';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: FULL },
  { path: 'manager', component: ManagerComponent, pathMatch: FULL }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }