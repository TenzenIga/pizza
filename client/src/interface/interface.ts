export interface IProduct{
    id:number
    name:string
    price:number
    img:string
  }


  export interface IUser{
    username:string,
    uid:number
    token:string
  }
  
  export interface ICart extends IProduct{
    quantity:number
  }

