export interface IPost{
    comments?:string
    file?:File[]
}

export interface IGetPost{
    photo:string
    videos:string
    likestatus:string
    comments:string
    appuser:string
}