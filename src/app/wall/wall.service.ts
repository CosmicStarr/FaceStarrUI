import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGetPost, IPost } from '../Models/IPost';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }


  createAPost(values:FormData){
    return this.http.post<IPost>(this.baseUrl + 'Account/CreatePost', values)
  }
  getPost(){
    return this.http.get<IGetPost[]>(this.baseUrl + 'Account/GlobalPost')
  }
}
