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
import { LeftWallComponent } from './left-wall/left-wall.component';
import { RightWallComponent } from './right-wall/right-wall.component';
import { WallFooterComponent } from './wall-footer/wall-footer.component';


@NgModule({
  declarations: [
    GlobalWallComponent,
    UploadImageComponent,
    DragDirective,
    NavBarComponent,
    LeftWallComponent,
    RightWallComponent,
    WallFooterComponent,
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
