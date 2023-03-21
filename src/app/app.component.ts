import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { IUser } from './Models/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private accountService:AccountService){

  }
  ngOnInit(): void {
    this.setCurrentUser()
    
  }
  // loadCurrentUser(){
  //   const token = localStorage.getItem('token');
  //     this.accountService.loadCurrentUser(token).subscribe({
  //      next: ()=> console.log('User Loaded')
  //   })
  // }
  setCurrentUser(){
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.accountService.setCurrentUser(user);
    }
  }
}
