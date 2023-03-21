import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ModalService } from 'src/app/_modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-global-wall',
  templateUrl: './global-wall.component.html',
  styleUrls: ['./global-wall.component.scss']
})
export class GlobalWallComponent implements OnInit{
  commentForm:FormGroup
  showStory:boolean = false
  showReel:boolean = true
  constructor(private formbuilder:FormBuilder,public modal: ModalService) {
  }

  ngOnInit(): void {
   this.commentForm = this.formbuilder.group({
    comment:this.formbuilder.control('What on your mind?')
   })
  }

  onImageSelect(image:File){
    // this.userForm.get('userImage').setValue(image)
  }
  showOptions(){
    this.showReel = false
    this.showStory = true
  }
  showOptions1(){
    this.showStory = false
    this.showReel = true
  }
 
}
