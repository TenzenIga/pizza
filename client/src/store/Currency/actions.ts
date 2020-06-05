
export const LOAD_EXCHANGE_RATE = 'LOAD_EXCHANGE_RATE';
export const SET_EXCHANGE_RATE = 'SET_EXCHANGE_RATE';
export const FETCH_EXCHANGE_RATE_FAIL = 'FETCH_EXCHANGE_RATE_FAIL';


export const setExchangeRate = (dataFromServer:number)=>{
    return{
        type: SET_EXCHANGE_RATE,
        payload: dataFromServer
    }
}

export const fetchExchangeError = (error:string)=>{
    return{
        type:FETCH_EXCHANGE_RATE_FAIL,
        payload:error
    }
}
export const loadExchange = ()=>{
    return{
        type:LOAD_EXCHANGE_RATE
    }
}