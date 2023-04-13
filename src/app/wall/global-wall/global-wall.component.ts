import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, mergeMap, switchMap } from 'rxjs';
import { IGetPost, ILikeAPost, IPost } from 'src/app/Models/IPost';
import { ModalService } from 'src/app/_modal';
import { WallService } from '../wall.service';

@Component({
  selector: 'app-global-wall',
  templateUrl: './global-wall.component.html',
  styleUrls: ['./global-wall.component.scss']
})
export class GlobalWallComponent implements OnInit{

  today: number = Date.now();
  commentForm:FormGroup
  likePostFrom:FormGroup
  showStory:boolean = false
  showReel:boolean = true
  globalPost:IGetPost[] = []
  likeInfo:IGetPost
  openStatus:boolean = false
  globalPost$:Observable<IGetPost[]>
  constructor(private formbuilder:FormBuilder,public modal: ModalService, private wallService:WallService) {}

  @ViewChild('statusID') inputID:ElementRef
  @ViewChild('postID') postInfo:ElementRef
  ngOnInit(): void {
    this.wallService.getInfo().subscribe({
      next:()=> this.getpost()
    })
    this.getpost()

    this.commentForm = this.formbuilder.group({
    comments:this.formbuilder.control('')
   })

   this.likePostFrom = this.formbuilder.group({
    like:this.formbuilder.control(false),
    likeStatusDTO:this.formbuilder.control('')
   })
   console.log(this.likePostFrom.get('likeStatusDTO').value)
  }

  //Get all Post
  getpost(){
    this.wallService.getPost().subscribe({
      next: (results) => this.globalPost = results, 
      error: x=> console.log(x)
    })
  }

  onSubmit(id:number,values:any){
    return this.wallService.LikeAPost(id,values)
    .subscribe({
      next:(results) => this.likeInfo = results,
      error: x => x.error,
      complete:()=>{
        
      }
    })
  }

  buildFormData = (post:IPost):FormData => {
    const data = new FormData
    data.append('comments',post.comments)
    return data
  }

  //fix the post a comment method!
  AddComment(){
    if(this.commentForm.dirty){
      const info = this.buildFormData(this.commentForm.value)
      this.wallService.createAPost(info).subscribe({
        next: (results)=> console.log(results),
        error:(err)=> alert(err.error.message),
        complete:()=>{
          this.commentForm.reset(true)
        } 
      })
    }
  }

  OnLike(id:number){
   if(id){
    if(this.openStatus == false){
      this.openStatus = true
    }else{
      this.openStatus = false
    }
   }
  }

  StatusValueCool(id:number){
    let info = this.inputID.nativeElement.value = 'cool'
    this.likePostFrom.get('likeStatusDTO').setValue(info)
    this.openStatus = false
    this.likePostFrom.get('like').setValue(true)
    console.log(this.likePostFrom.get('like').value)
    this.onSubmit(id,this.likePostFrom.value)
    this.inputID.nativeElement.value = null
    
  }
  StatusValueWonderful(id:number){
    this.inputID.nativeElement.value = 'Wonderful'
    this.openStatus = false
    this.inputID.nativeElement.value = null
    console.log()
  }
  StatusValueAmazing(id:number){
    let info = this.inputID.nativeElement.value = 'Amazing'
    this.openStatus = false
    this.inputID.nativeElement.value = null
    console.log()
  }
  StatusValueOutstanding(id:number){
    let info = this.inputID.nativeElement.value = 'Outstanding'
    this.openStatus = false
    this.inputID.nativeElement.value = null
    console.log()
  }
  StatusValueTooCosmic(id:number){
    let info = this.inputID.nativeElement.value = 'TooCosmic'
    this.openStatus = false
    this.inputID.nativeElement.value = null
    console.log()
  }




  onImageSelect(image:File){
    // this.userForm.get('userImage').setValue(image)
    console.log(image)
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
