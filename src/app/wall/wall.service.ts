import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGetPost, ILikeAPost, IPost } from '../Models/IPost';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  private currentnumberSource$ = new Subject<void>();
  getInfo(){
    return this.currentnumberSource$
  }
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  createAPost(values:FormData){
    return this.http.post<IPost>(this.baseUrl + 'Account/CreatePost', values)
  }
  getPost():Observable<IGetPost[]>{
    return this.http.get<IGetPost[]>(this.baseUrl + 'Account/GlobalPost')
  }

  LikeAPost(id:number,values:any){
    return this.http.post<IGetPost>(this.baseUrl + 'Account/LikedPost/' + id,values)
    .pipe(
      tap(()=>{
        return this.currentnumberSource$.next()
      })
    )
  }
}
