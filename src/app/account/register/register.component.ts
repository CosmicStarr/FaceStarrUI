import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Models/IUser';
import { IRegister } from 'src/app/Models/RegisterModel';
import { ModalService } from 'src/app/_modal';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit  {
  registerForm:FormGroup
  constructor(private accountService:AccountService) {}

  ngOnInit(): void {
   this.createForm()
  }
  
  onSubmit(){
    this.accountService.Register(this.registerForm.value).subscribe({
      next: ()=> console.log(this.registerForm.value),
      error: x => console.log(x),
      complete:()=>{
        //create some route logic here
        console.log('you made it!')
      }
    })
  }

  createForm(){
    this.registerForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password:new FormControl('',Validators.required),
      // firstName:new FormControl('',Validators.required),
      // lastName:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required),
      // role:new FormControl('',Validators.required),
      // JobDepartment:new FormControl('',Validators.required)
    })
  }
}
