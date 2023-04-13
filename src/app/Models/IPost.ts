import { Time } from "@angular/common"

export interface IPost{
    comments?:string
    file?:File[]
}

export interface IGetPost{
    id:number
    photos:[]
    videos:[]
    likestatus:ILikeAPost[]
    isMainComment:string
    email:string
    datePostedDTO:number
}

export interface ILikeAPost{
    like:boolean
    likeStatusDTO:string 
    AppUserLikes:string
}