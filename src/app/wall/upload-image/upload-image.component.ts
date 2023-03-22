import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { fileInfo } from 'src/app/Models/file';
import { IPost } from 'src/app/Models/IPost';
import { toBase64 } from 'src/app/Models/uploadToBase64';
import { environment } from 'src/environments/environment';
import { WallService } from '../wall.service';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit{
uploadedImage:string[]=[]
uploadedPicVidApi:File[]=[]
uploadedVideo:string[]=[]
show:boolean = true
@ViewChild("pTag") private paragraph:ElementRef
uploadPostForm:FormGroup
baseUrl = environment.baseUrl;
post:IPost
@Output() onUploadImageSelected = new EventEmitter()

  
  constructor(private wallService:WallService) {}
  ngOnInit(): void {
    this.createForm()
    console.log(this.uploadPostForm.get('file').valid)
  }

  pictureSelect(event){ 
    if(event.type == 'video/mp4'){
      console.log(`yes! Im coming from picSelect ${event}`)
      //pushing the video to an Array of files i will send to the api
      this.uploadedPicVidApi.push(event)
      //pushing the video to the src so user can confirm video will be uploaded!
      toBase64(event).then((value:string)=>this.uploadedVideo.push(value))
      this.removeDragandDropaPicElement()
      return
    }
    this.uploadedPicVidApi.push(event)
    toBase64(event).then((value:string)=>this.uploadedImage.push(value))
    this.removeDragandDropaPicElement()
  }

  pictureSelected(event){
    if(event.target.files.length > 0){      
      const file:File = event.target.files[0]
      if(file.type == 'video/mp4'){
        console.log(`yes! Im coming from pictureSelected! ${file}`)
        //pushing the video to an Array of files i will send to the api
        this.uploadedPicVidApi.push(file)
        //pushing the video to the src so user can confirm video will be uploaded!
        toBase64(file).then((value:string)=>this.uploadedVideo.push(value))
        this.removeDragandDropaPicElement()
        return
      }
      this.uploadedPicVidApi.push(file)
      toBase64(file).then((value:string)=>this.uploadedImage.push(value))
      this.removeDragandDropaPicElement()
      this.onUploadImageSelected.emit(file)
    }
  }

  createForm(){
    this.uploadPostForm = new FormGroup({
      comments:new FormControl(''),
      file:new FormControl('')
    })
    this.uploadPostForm.get('file').setValue(this.uploadedPicVidApi)
  }

  // buildFormData(post:IPost){
  //   const data = new FormData
  //   data.append('comments',post.comments)
  //   for(let i of this.uploadedPic)
  //   data.append('file',i)
  //   return data
  // }

 buildFormData = (post:IPost):FormData => {
    const data = new FormData
    data.append('comments',post.comments)
    for(let i of this.uploadedPicVidApi)
    data.append('file',i)
    return data
  }

  onSubmit(){
    const info = this.buildFormData(this.uploadPostForm.value)
    this.wallService.createAPost(info).subscribe({
      next: (results)=> console.log(results),
      error:(err)=> alert(err.error.message),
      complete:()=>{
        this.uploadPostForm.reset(true)
      } 
    })
  }

  removeDragandDropaPicElement(){
    if(this.uploadedImage || this.uploadedVideo){
      this.paragraph.nativeElement.remove()
      this.show = false
    }
  }


}

