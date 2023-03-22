import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { IGetPost } from 'src/app/Models/IPost';
import { ModalService } from 'src/app/_modal';
import { environment } from 'src/environments/environment';
import { WallService } from '../wall.service';

@Component({
  selector: 'app-global-wall',
  templateUrl: './global-wall.component.html',
  styleUrls: ['./global-wall.component.scss']
})
export class GlobalWallComponent implements OnInit{
  commentForm:FormGroup
  showStory:boolean = false
  showReel:boolean = true
  globalPost:IGetPost[] = []
  constructor(private formbuilder:FormBuilder,public modal: ModalService, private wallService:WallService) {
  }

  ngOnInit(): void {
   this.getpost()
   this.commentForm = this.formbuilder.group({
    comment:this.formbuilder.control('What on your mind?')
   })
  }

  getpost(){
    this.wallService.getPost().subscribe({
      next: (results) => this.globalPost = results, 
      error: x=> console.log(x)
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
