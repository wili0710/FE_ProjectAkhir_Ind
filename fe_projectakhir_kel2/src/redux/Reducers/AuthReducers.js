const INITIAL_STATE = {
    id: 0,
    username: '',
    password: '',
    email: '',
    isLogin: false,
    isLoading: false,
    error: '',
    cart:[],
    dataProduct:[],
    dataJSON:{}
    
}

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'LOGIN':
        return {...state,...action.payload,isLogin:true,isLoading:false,cart:action.cart}
    

        default :
        return state
    }
}