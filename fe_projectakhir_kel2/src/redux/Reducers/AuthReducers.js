const INITIAL_STATE = {
    id: 1,
    name: 'Wili',
    email: 'wiliromarioakukom@gmail.com',
    role:'user',
    isLogin: true,
    isLoading: false,
    error: '',
    cart:[],
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

        default :
        return state
    }
}