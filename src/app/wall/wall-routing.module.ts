import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalWallComponent } from './global-wall/global-wall.component';

const routes: Routes = [
  {path:'global',component:GlobalWallComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WallRoutingModule { }
