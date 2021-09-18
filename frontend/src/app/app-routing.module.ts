import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manager', component: ManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }