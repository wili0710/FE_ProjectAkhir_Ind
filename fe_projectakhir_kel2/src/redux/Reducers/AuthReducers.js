const INITIAL_STATE = {
    id: 0,
    name: '',
    email: '',
    role:'',
    isLogin: false,
    isLoading: false,
    error: '',
    cart:{transaksi:[],transaksiparcel:[],transaksidetailsatuan:[],transaksidetailparcel:[]},
    isResetPass:false,
    dataProduct:[],
    dataJSON:{}

    // id: 0,
    // name: '',
    // email: '',
    // role:'',
    // isLogin: false,
    // isLoading: false,
    // error: '',
    // cart:[],
    // dataProduct:[],
    // dataJSON:{}
    
}

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'LOGIN':
        return {...state,...action.payload,isLogin:true,isLoading:false,cart:action.cart}
        
        case 'LOGOUT':
            return {INITIAL_STATE}
        
        case 'LOADING':
            return {...state,isLoading:true}
        
        case 'Error':
            return {...state,error:action.payload,isLoading:false}
        case 'CART':
            return {...state,cart:action.cart}
        
        case 'ADDCART':
            return {...state,cart:action.cart}    
        case 'RESETPASS':
            return {...state,isResetPass:action.payload}
        default :
        return state
    }
}