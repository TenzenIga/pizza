export interface IStore{
  cart:ICart[] 
  products:ProductsState
  user:IUser
  exchange:CurrencyState
}

export interface CurrencyState{
  exchangeRate:null | number
  error:null | string
}


export interface ProductsState{
  products:IProduct[]
  loading:boolean
  error:null | string
}

export interface IProduct{
    id:number
    name:string
    description:string
    price:number
    img:string
}


export interface IAction{
    type:string,
    payload:any
}

export interface IUser{
  isLoggedIn:boolean
  error:string | null  
  token:string | null
  username:string | null  
  uid:string | null
  isAdmin:boolean
  }
  
export interface ICart extends IProduct{
    quantity:number
}

export interface IOrder{
  order_id:number
  quantity: number
  sum:number
  name:string
  order_date:Date
}

export type userInput = {
    email:string
    password:string
}

