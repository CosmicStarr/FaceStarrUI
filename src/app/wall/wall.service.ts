import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPost } from '../Models/IPost';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }


  createAPost(values:FormData){
    return this.http.post<IPost>(this.baseUrl + 'Account/CreatePost', values)
  }
}
