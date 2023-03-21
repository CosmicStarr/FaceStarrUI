import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'account', loadChildren:()=>import('./account/account.module').then(mod =>mod.AccountModule)},
  {path:'wall', loadChildren:()=>import('./wall/wall.module').then(mod =>mod.WallModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
