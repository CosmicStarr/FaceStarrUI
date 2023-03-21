import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallRoutingModule } from './wall-routing.module';
import { GlobalWallComponent } from './global-wall/global-wall.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../_modal';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DragDirective } from './drag.directive';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    GlobalWallComponent,
    UploadImageComponent,
    DragDirective,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    WallRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    FileUploadModule,
  ],
  exports:[
    
  ]
})
export class WallModule { }
