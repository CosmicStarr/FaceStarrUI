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
    appuser:string
}

export interface ILikeAPost{
    like:boolean
    likeStatusDTO:string 
    AppUserLikes:string
}