import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  loginForm:FormGroup
  // returnUrl:string
  constructor(public modal: ModalService,private accountService:AccountService,private route:Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl 
    this.createForm()
  }
  
  createForm(){
    this.loginForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password:new FormControl('',Validators.required),
      // firstName:new FormControl('',Validators.required),
      // lastName:new FormControl('',Validators.required),
      // confirmPassword:new FormControl('',Validators.required),
      // role:new FormControl('',Validators.required),
      // JobDepartment:new FormControl('',Validators.required)
    })
  }

  onSubmit(){
    this.accountService.LoginUser(this.loginForm.value).subscribe({
      //routing logic here
      complete:()=> {
        // this.route.navigateByUrl(this.returnUrl)
      }
    })
  }

}
