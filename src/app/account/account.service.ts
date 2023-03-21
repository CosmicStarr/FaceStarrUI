import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../Models/IUser';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl;
  public currentUserSource = new ReplaySubject<IUser>(1)
  currentUser$ = this.currentUserSource.asObservable()
  helper = new JwtHelperService();
  constructor(private http:HttpClient,private route:Router) { }

  Register(values:any){
   return this.http.post<IUser>(this.baseUrl + 'Account/Register',values)
    .pipe(
      map((user:IUser)=>{
      if(user){
        console.log(user)
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',user.token)
      }
    }))
  }
  LoginUser(values:any){
    return this.http.post<IUser>(this.baseUrl + 'Account/Login',values)
    .pipe(
      map((results:IUser)=>{
        if(results){
          const decodeToken = this.helper.decodeToken<IUser>(results.token)
          results.email = decodeToken.email;
          results.jobDepartment = decodeToken.jobDepartment;
          results.role = decodeToken.role;
          localStorage.setItem('user',JSON.stringify(results))
          localStorage.setItem('token',results.token)
          this.setCurrentUser(results)
          console.log(results)
          return results
        }
      })
    )
  }

  // loadCurrentUser(token:string){
  //   if(token === null){
  //     this.currentUserSource.next(null);
  //     return of(null);
  //   }
  // let headers = new HttpHeaders();
  // headers = headers.set('Authorization',`Bearer ${token}`);
  //   return this.http.get(this.baseUrl +'Account',{headers}).pipe(
  //     map((user:IUser) =>{
  //       if(user){
  //         localStorage.setItem('token',user.token);
  //         this.currentUserSource.next(user);
  //       }
  //     })
  //   )
  // }

  decodeToken(token: string){
    return JSON.parse(window.atob(token.split('.')[1]));
  }
  setCurrentUser(user:IUser){
    if(user){
      user.role = [];
      const roles = this.decodeToken(user.token).role;
      Array.isArray(roles)? user.role = roles : user.role.push(roles);
      localStorage.setItem('user',JSON.stringify(user))
      this.currentUserSource.next(user);
    }
  }
}
